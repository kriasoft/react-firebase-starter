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

import store from './core/store';
import router from './core/router';
import history from './core/history';
/* eslint-disable import/no-unresolved */
import routes from '!!./tools/webpack.routes-loader!./routes';
/* eslint-enable import/no-unresolved */

const context = { store, history };
const container = document.getElementById('container');

// The top-level React component the goal of which is to provide
// context variables such as Redux store to all the child components
class App extends React.Component {
  static childContextTypes = {
    history: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
  };
  static propTypes = {
    component: React.PropTypes.node.isRequired,
  };
  getChildContext() { return context; }
  render() { return this.props.component; }
}

function render(location) {
  router.resolve(routes, { path: location.pathname })
    .then(component => {
      ReactDOM.render(<App component={component} />, container);
    });
}

history.listen(render);
render(history.getCurrentLocation());
