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
import { useHistory, useReset } from '../hooks';

const withAuth = () => (Component: any) => {
  function WithAuth(props) {
    const history = useHistory();
    const reset = useReset();

    function logIn(options: any = {}) {
      return openWindow(options.url || '/login', {
        onPostMessage({ data }) {
          if (typeof data === 'string' && data === 'login:success') {
            reset();
            history.replace(history.location);
            return Promise.resolve();
          }
        },
      });
    }

    async function logOut() {
      await fetch('/login/clear', {
        method: 'POST',
        credentials: 'include',
      });
      reset();
      history.push('/');
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
