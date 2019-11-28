/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { commitLocalUpdate } from 'relay-runtime';
import { useHistory } from './useHistory';
import { useRelay } from './useRelay';
import { useReset } from './useReset';

const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 600;

let loginWindow;

function openLoginWindow(url) {
  if (loginWindow && !loginWindow.closed) {
    loginWindow.location.href = url;
    loginWindow.focus();
  } else {
    const { screenLeft, screenTop, innerWidth, innerHeight, screen } = window;
    const html = window.document.documentElement;

    const dualScreenLeft = screenLeft !== undefined ? screenLeft : screen.left;
    const dualScreenTop = screenTop !== undefined ? screenTop : screen.top;
    const w = innerWidth || html.clientWidth || screen.width;
    const h = innerHeight || html.clientHeight || screen.height;

    const config = {
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      left: w / 2 - WINDOW_WIDTH / 2 + dualScreenLeft,
      top: h / 2 - WINDOW_HEIGHT / 2 + dualScreenTop,
    };

    loginWindow = window.open(
      url,
      null,
      Object.keys(config)
        .map(key => `${key}=${config[key]}`)
        .join(','),
    );
  }
}

const onLoginCallbacks = new Set();

function signIn() {
  return new Promise(resolve => {
    onLoginCallbacks.forEach(cb => cb(resolve));
  });
}

export function useAuth(options) {
  const relayRef = React.useRef();
  const callbacks = React.useRef([]);
  const history = useHistory();
  const relay = useRelay();
  const reset = useReset();

  React.useEffect(() => {
    relayRef.current = relay && relay.environment;
  }, [relay && relay.environment]);

  React.useEffect(() => {
    if (options && options.onLogin) {
      onLoginCallbacks.add(options.onLogin);
    }

    function handleMessage({ origin, data }) {
      if (origin === window.location.origin && data.type === 'LOGIN') {
        if (!data.error && relayRef.current) {
          const user = data.user;
          if (user && user.id) {
            commitLocalUpdate(relayRef.current, store => {
              const me = store.get(user.id) || store.create(user.id, 'User');
              Object.keys(user).forEach(key => {
                me.setValue(user[key], key);
              });
              store.getRoot().setLinkedRecord(me, 'me');
            });
          }
        }

        callbacks.current.forEach(cb =>
          data.error ? cb[1](data.error) : cb[0](data.user),
        );
        callbacks.current = [];
      }
    }

    window.addEventListener('message', handleMessage, true);
    return () => {
      window.removeEventListener('message', handleMessage);

      if (options && options.onLogin) {
        onLoginCallbacks.delete(options.onLogin);
      }
    };
  }, []);

  const signInWith = React.useCallback(
    provider => {
      openLoginWindow(`/login/${provider}`);
      return new Promise((resolve, reject) => {
        callbacks.current.push([resolve, reject]);
      }).then(user => {
        reset();
        history.replace(history.location);
        return user;
      });
    },
    [reset],
  );

  const signOut = React.useCallback(() => {
    fetch('/login/clear', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      reset();
      history.push('/');
    });
  }, [reset]);

  return React.useMemo(() => ({ signIn, signInWith, signOut }), [
    signIn,
    signInWith,
    signOut,
  ]);
}
