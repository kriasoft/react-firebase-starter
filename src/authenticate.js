/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { config } from 'firebase-functions';

import db from './db';

const jwtSecret = process.env.JWT_SECRET || config().jwt.secret;

// Using "__session" as the name of the session cookie will automatically make
// it a part of the cache key in Firebase CDN hosting.
// https://firebase.google.com/docs/hosting/functions
const sessKey = '__session';
const sessOpt = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 365 * 10 /* 10 years */,
};

/**
 * Authentication middleware for Express.js. Note that users must be kept
 * authenticated as long as possible. Ideally, forever. It is possible to force
 * a user to sign in or revoke access by checking user's ID token and the
 * corresponding user record in the database (e.g. check the last sign in
 * date/time and the IP address used at sign in).
 */
export default async function authenticate(req, res, next) {
  // Try to obtain an ID token from the session cookie
  const token = cookie.parse(req.headers.cookie || '')[sessKey];

  // Check if the provided ID token is valid
  if (token) {
    try {
      // Try to obtain the user's ID from the token
      const { sub: id } = jwt.verify(token, jwtSecret) || {};

      // If the user is authenticated, make it available to the
      // rest of the app via `req.user` context variable.
      req.user = id
        ? (await db
            .table('users')
            .where({ id })
            .first()) || null
        : null;
    } catch (err) {
      req.user = null;
      console.error(err);
    }
  }

  req.signIn = user => {
    res.cookie(
      sessKey,
      jwt.sign({ login_ip: req.ip }, jwtSecret, {
        issuer: 'https://firebase.reactstarter.com',
        subject: user.id,
        expiresIn: '10 years',
      }),
      sessOpt,
    );
  };

  req.signOut = () => {
    res.clearCookie(sessKey, sessOpt);
  };

  next();
}
