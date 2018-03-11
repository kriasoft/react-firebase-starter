/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import express from 'express';
import firebase from 'firebase-admin';

import api from './graphql';
import ssr from './ssr';

const firebaseKey = process.env.FIREBASE_KEY;
if (!firebaseKey) new Error('Please provide FIREBASE_KEY');

if (!firebase.apps.length) {
  // JSON key with service account credentials
  // https://firebase.google.com/docs/admin/setup
  firebase.initializeApp({
    credential: firebase.credential.cert(JSON.parse(firebaseKey)),
  });
}

const app = express();

app.use(api); // GraphQL API
app.use(ssr); // Server-side rendering

export default app;
