/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import type { Request } from 'express';

import db from './db';
import DataLoader from './DataLoader';
import { mapTo } from './utils';
import { UnauthorizedError, ValidationError } from './errors';

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
      .then(rows => {
        rows.forEach(x => this.userByUsername.prime(x.username, x));
        return rows;
      })
      .then(mapTo(keys, x => x.id)),
  );

  userByUsername = new DataLoader(keys =>
    db
      .table('users')
      .whereIn('username', keys)
      .select()
      .then(rows => {
        rows.forEach(x => this.userById.prime(x.id, x));
        return rows;
      })
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
   * Authorization rules
   * ------------------------------------------------------------------------ */

  ensureIsAuthenticated() {
    if (!this.user) {
      throw new UnauthorizedError();
    }
  }

  ensureIsAdmin() {
    this.ensureIsAuthenticated();
    // TODO: Check if "admin" claim exists for the current user
  }

  ensureIsValid() {
    if (this.errors.length) {
      throw new ValidationError(this.errors);
    }
  }
}

function userFromToken(token) {
  return token
    ? {
        id: token.uid,
        email: token.email,
        emailVerified: token.email_verified,
        displayName: token.name,
        photoURL: token.picture,
      }
    : null;
}

export default Context;
