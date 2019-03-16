/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { canUseDOM } from './env';

export function gtag() {
  if (canUseDOM && window.dataLayer) {
    window.dataLayer.push(arguments);
  }
}
