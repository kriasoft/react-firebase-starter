/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import App from './common/App';
import createRelay from './createRelay';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App history={createHistory()} createRelay={createRelay} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
