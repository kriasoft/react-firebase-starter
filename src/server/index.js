/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

const dotenv = require('dotenv');
const express = require('express');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');

// Infer runtime environment from the project's name, for example:
//   "example-prod" => "prod"
//   "example-test" => "test"
const [, env] = (x => x && x.match(/-(\w+)$/))(process.env.GCP_PROJECT) || [];

dotenv.config({ path: `.env.${env === 'prod' ? 'production' : env}` });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Configure Firebase Admin SDK
// https://firebase.google.com/docs/admin/setup
if (!firebase.apps.length) {
  if (process.env.GCP_SERVICE_KEY) {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        JSON.parse(process.env.GCP_SERVICE_KEY),
      ),
    });
  } else {
    firebase.initializeApp();
  }
}

if (process.env.NODE_ENV === 'production') {
  // Server environment
  exports.login = functions.https.onRequest(require('./login').default);
  exports.graphql = functions.https.onRequest(require('./api').default);
  exports.default = functions.https.onRequest(require('./ssr').default);
} else {
  // Local/dev environment
  const app = express();
  const db = require('./db').default;
  app.use(require('./login').default);
  app.use(require('./api').default);
  app.use(require('./ssr').default);
  module.exports.default = app;
  module.exports.dispose = () => db.destroy();
}
