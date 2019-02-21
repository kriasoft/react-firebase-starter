/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';

const providers = {
  facebook: {
    name: 'Facebook',
    icon: FacebookIcon,
  },
  google: {
    name: 'Google',
    icon: GoogleIcon,
  },
};

const styles = {
  root: {
    fontSize: '1em',
    fontWeight: 100,
    textTransform: 'none',
    letterSpacing: 1,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: '0.625em',

    '& path': {
      fill: '#fff',
    },
  },

  provider: {
    marginLeft: '0.375em',
    fontWeight: 400,
  },

  facebook: {
    backgroundColor: 'rgb(66, 103, 178)',
    '&:hover': {
      backgroundColor: darken('rgb(66, 103, 178)', 0.1),
    },
  },

  google: {
    backgroundColor: 'rgb(66, 133, 244)',
    '&:hover': {
      backgroundColor: darken('rgb(66, 133, 244)', 0.1),
    },
  },
};

class LoginButton extends React.PureComponent<any> {
  static propTypes = {
    provider: PropTypes.oneOf(Object.keys(providers)),
  };

  render() {
    const { className, classes: s, provider, ...rest } = this.props;
    const { name, icon: Icon } = providers[provider];

    return (
      <Button
        className={cx(className, s.root, s[provider])}
        color="primary"
        variant="contained"
        component="a"
        href={`/login/${provider}`}
        {...rest}
      >
        <Icon className={s.icon} />
        Continue with <strong className={s.provider}>{name}</strong>
      </Button>
    );
  }
}

export default withStyles(styles)(LoginButton);
