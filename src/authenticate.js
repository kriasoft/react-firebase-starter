/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import cookie from 'cookie';
import firebase from 'firebase-admin';
import request from 'request-promise-native';
import config from './config';

const sessKey = '__session';
const sessOpt = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 365 * 10 /* 10 years */,
  secure: !!process.env.GCP_PROJECT,
};
const { firebase: { apiKey } } = config;
const tokenUrl = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;

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
          const { id_token: idToken } = await request.post({
            url: tokenUrl,
            form: {
              grant_type: 'refresh_token',
              refresh_token: tokens[1],
            },
            json: true,
          });
          req.user = await firebase.auth().verifyIdToken(idToken);
          res.cookie(sessKey, `${idToken}:${tokens[1]}`, sessOpt);
        } catch (e) {
          console.error(e);
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
