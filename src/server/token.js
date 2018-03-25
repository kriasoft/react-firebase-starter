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
  /**
   * Exchange refresh token for an ID token.
   * https://firebase.google.com/docs/reference/rest/auth/#section-refresh-token
   */
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

  /**
   * Exchange custom token for an ID and refresh tokens.
   * https://firebase.google.com/docs/reference/rest/auth/#section-verify-custom-token
   */
  verifyCustomToken(token) {
    return request.post({
      url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${apiKey}`,
      body: {
        token,
        returnSecureToken: true,
      },
      json: true,
    });
  },
};
