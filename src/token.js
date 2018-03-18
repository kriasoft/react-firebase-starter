/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import request from 'request-promise-native';
import { config } from 'firebase-functions';

const apiKey = process.env.FIREBASE_API_SERVER_KEY || config().api.serverkey;

export default {
  renew(refreshToken) {
    return request.post({
      url: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      form: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      json: true,
    });
  },
};
