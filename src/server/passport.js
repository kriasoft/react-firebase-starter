/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import uuid from 'uuid';
import passport from 'passport';
import jwt from 'jwt-passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from 'firebase-functions';

import db, { findUserByCredentials } from './db';

const origin = process.env.GCP_PROJECT ? config().app.origin : '';

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

// https://github.com/jaredhanson/passport-google-oauth2
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${origin}/login/google/return`,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, cb) => {
      const credentials = { accessToken, refreshToken };
      findUserByCredentials(profile, credentials)
        .then(user => cb(null, user))
        .catch(err => cb(err));
    },
  ),
);

// https://github.com/jaredhanson/passport-facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || config().facebook.app_id,
      clientSecret:
        process.env.FACEBOOK_APP_SECRET || config().facebook.app_secret,
      callbackURL: `${origin}/login/facebook/return`,
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
    (req, accessToken, refreshToken, profile, cb) => {
      const credentials = { accessToken, refreshToken };
      findUserByCredentials(profile, credentials)
        .then(user => cb(null, user))
        .catch(err => cb(err));
    },
  ),
);

export default passport;
