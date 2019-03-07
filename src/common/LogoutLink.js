/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';

import Link from './Link';
import { useHistory, useReset } from '../hooks';

function LoginLink({ onClick, href, ...props }) {
  const history = useHistory();
  const reset = useReset();

  async function handleClick() {
    if (onClick) onClick();
    await fetch('/login/clear', {
      method: 'POST',
      credentials: 'include',
    });
    reset();
    history.push('/');
  }

  return (
    <Link href={history.location.pathname} onClick={handleClick} {...props} />
  );
}

export default LoginLink;
