/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

function gtag() {
  window.dataLayer.push(arguments);
}

function noop() {}

export default (window.config.gaTrackingId ? gtag : noop);
