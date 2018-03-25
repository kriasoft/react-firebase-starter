/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import type { Request } from 'express';

import db from './db';
import DataLoader from './DataLoader';
import Validator from './Validator';
import { mapTo, mapToMany } from './utils';
import { UnauthorizedError, ForbiddenError, ValidationError } from './errors';

class Context {
  errors = [];

  constructor(req: Request) {
    if (req.user) {
      // Add user object to the cache
      this.userById.prime(req.user.id, req.user);
      this.userByUsername.prime(req.user.username, req.user);

      // Convert snake_case fields to camelCase for convinience
      this.user = Object.keys(req.user).reduce((acc, key) => {
        acc[key.replace(/_\w/g, x => x.toUpperCase())] = req.user[key];
        return acc;
      }, {});
    } else {
      this.user = null;
    }

    // Some GraphQL mutations may need to sign in / sign out a user
    this.logIn = req.logIn;
    this.logOut = req.logOut;
  }

  /*
   * Authorization
   * ------------------------------------------------------------------------ */

  ensureIsAuthorized(check) {
    if (!this.user) {
      throw new UnauthorizedError();
    }

    if (check && !check(this.user)) {
      throw new ForbiddenError();
    }
  }

  /*
   * Validation
   * ------------------------------------------------------------------------ */

  addError(key, message) {
    this.errors.push({ key, message });
  }

  validate(input) {
    const validator = new Validator(input, errors => {
      throw new ValidationError(errors);
    });

    return transform => {
      transform(validator);
      return validator.validate();
    };
  }

  /*
   * Data loaders
   * ------------------------------------------------------------------------ */

  userById = new DataLoader(keys =>
    db
      .table('users')
      .whereIn('id', keys)
      .select()
      .then(rows =>
        rows.map(x => {
          this.userByUsername.prime(x.username, x);
          return x;
        }),
      )
      .then(mapTo(keys, x => x.id)),
  );

  userByUsername = new DataLoader(keys =>
    db
      .table('users')
      .whereIn('username', keys)
      .select()
      .then(rows =>
        rows.map(x => {
          this.userById.prime(x.id, x);
          return x;
        }),
      )
      .then(mapTo(keys, x => x.username)),
  );

  identitiesByUserId = new DataLoader(keys =>
    db
      .table('user_identities')
      .whereIn('user_id', keys)
      .select()
      .then(mapToMany(keys, x => x.user_id)),
  );

  storyById = new DataLoader(keys =>
    db
      .table('stories')
      .whereIn('id', keys)
      .select()
      .then(rows => {
        rows.forEach(x => this.storyBySlug.prime(x.slug, x));
        return rows;
      })
      .then(mapTo(keys, x => x.id)),
  );

  storyBySlug = new DataLoader(keys =>
    db
      .table('stories')
      .whereIn('slug', keys)
      .select()
      .then(rows => {
        rows.forEach(x => this.storyById.prime(x.id, x));
        return rows;
      })
      .then(mapTo(keys, x => x.slug)),
  );
}

export default Context;
