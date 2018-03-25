/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import uuid from 'uuid';
import passport from 'passport';
import jwt from 'jwt-passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from 'firebase-functions';

import db from './db';
import logIn from './utils/logIn';

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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/login/facebook/return',
      profileFields: [
        'id',
        'cover',
        'name',
        'displayName',
        'age_range',
        'link',
        'gender',
        'locale',
        'picture',
        'timezone',
        'updated_time',
        'verified',
        'email',
      ],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        const credentials = { accessToken, refreshToken };
        const user = await logIn(req, profile, credentials);
        cb(null, user);
      } catch (err) {
        cb(err);
      }
    },
  ),
);

export default passport;
