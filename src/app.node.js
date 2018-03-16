/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

const express = require('express');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');

// Configure Firebase Admin SDK
// https://firebase.google.com/docs/admin/setup
if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(
      process.env.FIREBASE_SERVICE_KEY
        ? JSON.parse(process.env.FIREBASE_SERVICE_KEY)
        : functions.config().key,
    ),
  });
}

if (process.env.NODE_ENV === 'production') {
  // Server environment
  exports.graphql = functions.https.onRequest(require('./graphql').default);
  exports.default = functions.https.onRequest(require('./ssr').default);
} else {
  // Local/dev environment
  const app = express();
  const db = require('./graphql/db').default;
  app.use(require('./graphql').default);
  app.use(require('./ssr').default);
  module.exports.default = app;
  module.exports.dispose = () => db.destroy();
}
