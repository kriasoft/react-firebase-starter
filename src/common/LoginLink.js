/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';

import Link from './Link';
import { useHistory, useReset } from '../hooks';
import { openWindow } from '../utils';

function LoginLink({ onClick, href, ...props }) {
  const history = useHistory();
  const reset = useReset();
  const link = href ? `/login?return=${href}` : '/login';

  function handleClick(event) {
    event.preventDefault();
    if (onClick) onClick();
    openWindow(link, {
      onPostMessage({ data }) {
        if (typeof data === 'string' && data === 'login:success') {
          reset();
          history.replace(history.location);
          return Promise.resolve();
        }
      },
    });
  }

  return <Link href={link} onClick={handleClick} {...props} />;
}

export default LoginLink;
