/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './core/store';
import router from './core/router';
import history from './core/history';
/* eslint-disable import/no-unresolved */
import routes from '!!./tools/webpack.routes-loader!./routes';
/* eslint-enable import/no-unresolved */

const container = document.getElementById('container');

function render(location) {
  router.resolve(routes, { path: location.pathname })
    .then(component => {
      ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
    });
}

history.listen(render);
render(history.getCurrentLocation());
