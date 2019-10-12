/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import GoogleIcon from '../icons/Google';
import FacebookIcon from '../icons/Facebook';
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

const providers = [
  { id: 'google', name: 'Google', icon: GoogleIcon },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon },
];

function LoginForm(props) {
  const { onLoginComplete, ...other } = props;
  const s = useStyles();
  const auth = useAuth();

  function signIn(event) {
    const { provider } = event.currentTarget.dataset;
    auth.signInWith(provider).then(user => {
      onLoginComplete(user);
    });
  }

  return (
    <div {...other}>
      <Typography paragraph align="center">
        Sign in or register with your social media account
      </Typography>
      <Typography paragraph align="center">
        {providers.map(x => (
          <Button
            key={x.id}
            className={s.button}
            variant="outlined"
            size="large"
            onClick={signIn}
            data-provider={x.id}
            title={`Continue with ${x.name}`}
          >
            {React.createElement(x.icon)}
          </Button>
        ))}
      </Typography>
    </div>
  );
}

LoginForm.propTypes = {
  onLoginComplete: PropTypes.func.isRequired,
};

export default LoginForm;
