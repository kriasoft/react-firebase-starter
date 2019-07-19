/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import QueryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import LoginButton from '../common/LoginButton';
import { gtag } from '../utils';
import { useHistory } from '../hooks';

const useStyles = makeStyles(theme => ({
  '@global html': {
    height: '100%',
  },
  '@global body': {
    height: '100%',
    margin: 0,
    background: 'rgb(250, 250, 250)',
  },
  '@global #root': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    resize: 'vertical',
  },
  container: {
    display: 'flex',
    paddingBottom: '20vh',
    margin: '0 auto',
    flexDirection: 'column',
  },
  title: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  error: {
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
    textAlign: 'center',
  },
  login: {
    marginBottom: theme.spacing(2),
  },
}));

function Login() {
  const s = useStyles();
  const history = useHistory();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    const { location, top, opener } = window;
    const query = QueryString.parse(location.search);

    if (query.success !== undefined && top) {
      gtag('event', 'login');
      if (opener) {
        opener.postMessage('login:success', location.origin);
      } else {
        history.push('/');
      }
    } else if (query.error) {
      gtag('event', 'exception', { description: query.error, fatal: false });
      setError(query.error);
    }
  }, []);

  return (
    <div className={s.container}>
      <Typography className={s.title} variant="h5">
        Sign In
      </Typography>
      <LoginButton className={s.login} provider="google" />
      <LoginButton className={s.login} provider="facebook" />
      {error && <Typography className={s.error}>{error}</Typography>}
    </div>
  );
}

export default Login;
