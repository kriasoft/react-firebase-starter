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
import { mapTo } from './utils';
import { UnauthorizedError, ForbiddenError, ValidationError } from './errors';

class Context {
  errors = [];

  constructor(req: Request) {
    this.user = userFromToken(req.user);
    this.signIn = req.signIn;
    this.signOut = req.signOut;
  }

  addError(key, message) {
    this.errors.push({ key, message });
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

  validate(input) {
    const validator = new Validator(input, errors => {
      throw new ValidationError(errors);
    });

    return transform => {
      transform(validator);
      return validator.validate();
    };
  }
}

function userFromToken(token) {
  return token
    ? {
        id: token.id,
        uid: token.uid,
        email: token.email,
        emailVerified: token.email_verified,
        displayName: token.name,
        photoURL: token.picture,
        isAdmin: token.is_admin,
      }
    : null;
}

export default Context;
