/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import uuid from 'uuid';
import passport from 'passport';
import jwt from 'jwt-passport';
import { config } from 'firebase-functions';

import db from '../db';
import facebookStrategy from './strategy/facebook';

passport.framework(
  jwt({
    secret: process.env.JWT_SECRET || config().jwt.secret,
    issuer: 'https://firebase.reactstarter.com',
    createToken: req => ({
      sub: req.user.id,
      jti: uuid.v4(),
    }),
    saveToken: token =>
      db.table('user_tokens').insert({
        user_id: token.sub,
        token_id: token.jti,
      }),
    deleteToken: token =>
      db
        .table('user_tokens')
        .where({ token_id: token.jti })
        .del(),
    findUser: token =>
      db
        .table('user_tokens')
        .leftJoin('users', 'users.id', 'user_tokens.user_id')
        .where({ 'user_tokens.token_id': token.jti })
        .select('users.*')
        .first(),
  }),
);

passport.use(facebookStrategy);

export default passport;
