/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';

import { useHistory } from './useHistory';
import { useReset } from './useReset';
import { openWindow } from '../utils';

export function useAuth() {
  const history = useHistory();
  const reset = useReset();

  return React.useMemo(
    () => ({
      signIn(options = {}) {
        return openWindow(options.url || '/login', {
          onPostMessage({ data }) {
            if (typeof data === 'string' && data === 'login:success') {
              reset();
              history.replace(history.location);
              return Promise.resolve();
            }
          },
        });
      },

      async signOut() {
        await fetch('/login/clear', {
          method: 'POST',
          credentials: 'include',
        });
        reset();
        history.push('/');
      },
    }),
    [],
  );
}
