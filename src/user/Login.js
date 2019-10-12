/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../common/AppBar';
import LoginForm from '../common/LoginForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'table',
    minHeight: '100vh',
    paddingTop: 64,
  },
  form: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
}));

function Login() {
  const s = useStyles();

  function handleLoginComplete({ user, relay } = {}) {
    console.log('user:', user);
  }

  return (
    <React.Fragment>
      <AppBar me={null} close />
      <Container className={s.root}>
        <LoginForm className={s.form} onLoginComplete={handleLoginComplete} />
      </Container>
    </React.Fragment>
  );
}

export default Login;
