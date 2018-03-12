/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { config } from 'firebase-functions';

const firebaseConfig =
  (process.env.FIREBASE_CONFIG && JSON.parse(process.env.FIREBASE_CONFIG)) ||
  config().config;

if (!firebaseConfig) new Error('Please provide FIREBASE_CONFIG');

export default { firebase: firebaseConfig };
