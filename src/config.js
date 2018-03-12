/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { config } from 'firebase-functions';

const firebaseClient =
  config().client || JSON.parse(process.env.REACT_APP_FIREBASE);

if (!firebaseClient) new Error('Please provide REACT_APP_FIREBASE key');

export default { firebase: firebaseClient };
