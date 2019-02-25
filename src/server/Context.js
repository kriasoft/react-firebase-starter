/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import type { Request } from 'express';
import DataLoader from 'dataloader';

import db from './db';
import Validator from './Validator';
import { mapTo, mapToMany, mapToValues } from './utils';
import { UnauthorizedError, ForbiddenError, ValidationError } from './errors';

class Context {
  errors = [];

  constructor(req: Request) {
    if (req.user) {
      // Add user object to the cache
      this.userById.prime(req.user.id, req.user);
      this.userByUsername.prime(req.user.username, req.user);

      // Convert snake_case fields to camelCase for convinience
      Object.keys(req.user).forEach(key => {
        req.user[key.replace(/_\w/g, x => x[1].toUpperCase())] = req.user[key];
      });

      this.user = req.user;
    } else {
      this.user = null;
    }

    // Some GraphQL mutations may need to sign in / sign out a user
    this.logIn = req.logIn;
    this.logOut = req.logOut;
    this.ip = req.ip;
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

  storyPointsCount = new DataLoader(keys =>
    db
      .table('stories')
      .leftJoin('story_points', 'story_points.story_id', 'stories.id')
      .whereIn('stories.id', keys)
      .groupBy('stories.id')
      .select('stories.id', db.raw('count(story_points.user_id)::int'))
      .then(mapToValues(keys, x => x.id, x => parseInt(x.count, 10))),
  );

  storyPointGiven = new DataLoader(keys => {
    const { id: userId } = this.user;

    return db
      .table('stories')
      .leftJoin('story_points', function join() {
        this.on('story_points.story_id', 'stories.id').andOn(
          'story_points.user_id',
          db.raw('?', [userId]),
        );
      })
      .whereIn('stories.id', keys)
      .select(
        'stories.id',
        db.raw('(story_points.user_id IS NOT NULL) AS given'),
      )
      .then(mapToValues(keys, x => x.id, x => x.given));
  });
}

export default Context;
