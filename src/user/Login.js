/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import LoginButton from '../common/LoginButton';
import gtag from '../utils/gtag';

const styles = theme => ({
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
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  error: {
    marginBottom: theme.spacing.unit * 2,
    color: theme.palette.error.main,
    textAlign: 'center',
  },
  login: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Login extends React.Component<{}> {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  state = { error: null };

  componentDidMount() {
    const {
      location: { search, origin },
      top,
      opener,
    } = window;

    if (search.includes('success') && top) {
      gtag('event', 'login');
      if (opener) {
        opener.postMessage('login:success', origin);
      } else {
        this.context.history.push('/');
      }
    } else if (search.includes('error')) {
      const params = search.slice(1).split('=');
      const error = decodeURI(params[params.indexOf('error') + 1]);
      gtag('event', 'exception', { description: error, fatal: false });
      this.setState({ error });
    }
  }

  render() {
    const { classes: s } = this.props;
    return (
      <div className={s.container}>
        <Typography className={s.title} variant="headline">
          Sign In
        </Typography>
        <LoginButton className={s.login} provider="google" />
        <LoginButton className={s.login} provider="facebook" />
        <Typography className={s.error}>{this.state.error}</Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
