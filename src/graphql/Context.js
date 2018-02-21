/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import DataLoader from './DataLoader';
import type { Request } from 'express';

import auth from './auth';
import { UnauthorizedError } from './errors';

class Context {
  constructor(req: Request) {
    this._req = req;
  }

  get user() {
    return userFromToken(this._req.user);
  }

  userById = new DataLoader(keys =>
    Promise.all(keys.map(key => auth.getUser(key))),
  );

  signIn(token) {
    return this._req.signIn(token).then(userFromToken);
  }

  signOut() {
    this._req.signOut();
  }

  ensureIsAuthenticated() {
    if (!this.user) {
      throw new UnauthorizedError();
    }
  }
}

function userFromToken(token) {
  return token
    ? {
        uid: token.uid,
        email: token.email,
        emailVerified: token.email_verified,
        displayName: token.name,
        photoURL: token.picture,
      }
    : null;
}

export default Context;
