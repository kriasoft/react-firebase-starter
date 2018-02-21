/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { default as firebase, auth } from 'firebase-admin';
import { config } from 'firebase-functions';

if (!firebase.apps.length) {
  if (process.env.FIREBASE_CREDENTIALS) {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        JSON.parse(process.env.FIREBASE_CREDENTIALS),
      ),
    });
  } else {
    firebase.initializeApp(config().firebase);
  }
}

export default auth();
