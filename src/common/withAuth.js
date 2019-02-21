/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { wrapDisplayName } from 'recompose';

import { openWindow } from '../utils';
import { useReset } from '../hooks';

const withAuth = () => (Component: any) => {
  function WithAuth(props) {
    const reset = useReset();

    function logIn(options: any = {}) {
      return openWindow(options.url || '/login', {
        onPostMessage(event) {
          if (event.data === 'login:success') return reset();
        },
      });
    }

    function logOut() {
      return fetch('/login/clear', {
        method: 'POST',
        credentials: 'include',
      }).then(() => reset());
    }

    return <Component logIn={logIn} logOut={logOut} {...props} />;
  }

  if (process.env.NODE_ENV !== 'production') {
    WithAuth.displayName = wrapDisplayName(Component, 'withAuth');
  }

  hoistNonReactStatics(WithAuth, Component);

  return WithAuth;
};

export default withAuth;
