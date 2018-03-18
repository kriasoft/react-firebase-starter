/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import cookie from 'cookie';
import firebase from 'firebase-admin';
import token from './token';

const sessKey = '__session';
const sessOpt = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 365 * 10 /* 10 years */,
};

/**
 * Authentication middleware for Express.js
 */
export default async function authenticate(req, res, next) {
  // Try to obtain Firebase ID and refresh tokens from the session cookie
  const cookies = req.headers.cookie || '';
  const tokens = (cookie.parse(cookies)[sessKey] || '').split(':');

  // Check if the provided Firebase ID token is valid
  if (tokens[0]) {
    try {
      req.user = await firebase.auth().verifyIdToken(tokens[0]);
    } catch (err) {
      if (err.message.includes('auth/id-token-expired') && tokens[1]) {
        try {
          const { id_token: idToken } = await token.renew(tokens[1]);
          req.user = await firebase.auth().verifyIdToken(idToken);
          res.cookie(sessKey, `${idToken}:${tokens[1]}`, sessOpt);
        } catch (renewError) {
          console.error(renewError);
        }
      } else {
        console.error(err);
      }
    }
  }

  req.user = req.user || null;
  req.signIn = async (idToken, refreshToken) => {
    res.cookie(sessKey, `${idToken}:${refreshToken}`, sessOpt);
  };
  req.signOut = () => {
    res.clearCookie(sessKey, sessOpt);
  };

  next();
}
