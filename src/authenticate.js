/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import idx from 'idx';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import db from './db';

const sessKey = '__session';
const sessOpt = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 365 * 10 /* 10 years */,
};

function createTokens(user) {
  const idToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      email_verified: user.email_verified,
      display_name: user.display_name,
      photo_url: user.photo_url,
      is_admin: user.is_admin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1 hour',
    },
  );

  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '365 days',
  });

  return `${idToken}:${refreshToken}`;
}

/**
 * Authentication middleware for Express.js
 */
export default async function authenticate(req, res, next) {
  // Try to obtain an ID token from the session cookie
  const [idToken, refreshToken] =
    idx(req, x => cookie.parse(x.headers.cookie)[sessKey].split(':')) || [];

  // Check if the provided ID token is valid
  if (idToken) {
    try {
      req.user = jwt.verify(idToken, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError' && refreshToken) {
        try {
          const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET) || {};
          const user =
            id &&
            (await db
              .table('users')
              .where({ id })
              .first());
          if (user) {
            res.cookie(sessKey, createTokens(user), sessOpt);
          }
        } catch (renewError) {
          console.error(renewError);
        }
      } else {
        console.error(err);
      }
    }
  }

  req.user = req.user || null;

  req.signIn = user => {
    res.cookie(sessKey, createTokens(user), sessOpt);
  };

  req.signOut = () => {
    res.clearCookie(sessKey, sessOpt);
  };

  next();
}
