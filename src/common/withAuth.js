/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { wrapDisplayName } from 'recompose';

import openWindow from '../utils/openWindow';

const withAuth = () => Component => {
  class WithAuth extends React.Component {
    static contextTypes = {
      reset: PropTypes.func.isRequired,
    };

    logIn = (options = {}) => {
      const { reset } = this.context;
      return openWindow(options.url || '/login', {
        onPostMessage(event) {
          if (event.data === 'login:success') return reset();
        },
      });
    };

    logOut = () => {
      const { reset } = this.context;
      return fetch('/login/clear', {
        method: 'POST',
        credentials: 'include',
      }).then(reset);
    };

    render() {
      return (
        <Component logIn={this.logIn} logOut={this.logOut} {...this.props} />
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithAuth.displayName = wrapDisplayName(Component, 'withAuth');
  }

  hoistNonReactStatics(WithAuth, Component);

  return WithAuth;
};

export default withAuth;
