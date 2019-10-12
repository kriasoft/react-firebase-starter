/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';

import Link from './Link';
import { useAuth, useHistory } from '../hooks';

const LoginLink = React.forwardRef(function LoginLink(props, ref) {
  const { onClick, ...other } = props;
  const { location } = useHistory();
  const auth = useAuth();

  const href =
    location.pathname === '/'
      ? '/login'
      : `/login?return=${encodeURIComponent(location.pathname)}`;

  function handleClick(event) {
    event.preventDefault();
    auth.signIn();
    if (onClick) {
      onClick();
    }
  }

  return <Link href={href} onClick={handleClick} ref={ref} {...other} />;
});

export default LoginLink;
