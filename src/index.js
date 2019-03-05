/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './common/App';
import createRelay from './createRelay';
import * as serviceWorker from './serviceWorker';
import router from './router';
import { setHistory } from './utils/scrolling';

const container = document.getElementById('root');
const history = createBrowserHistory();

let relay = createRelay();

setHistory(history);

function reset() {
  relay = createRelay();
  window.sessionStorage.removeItem('returnTo');
}

function render(location) {
  router
    .resolve({
      pathname: location.pathname,
      query: qs.parse(location.search),
      relay,
      config: window.config,
    })
    .then(route => {
      if (route.redirect) {
        history.replace(route.redirect);
      } else {
        ReactDOM.render(
          <App
            {...route}
            config={window.config}
            history={history}
            relay={relay}
            reset={reset}
          />,
          container,
        );
      }
    });
}

history.listen(render);
render(history.location);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Hot Module Replacement
// https://webpack.js.org/guides/hot-module-replacement/
if (module.hot) {
  module.hot.accept('./router', () => {
    render(history.location);
  });
}
