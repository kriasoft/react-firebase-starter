/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import styled from 'styled-components';

import auth from '../auth';

const Title = styled(DialogTitle)`
  && {
    text-align: center;
  }
`;

const defaultState = {
  error: null,
  loading: false,
};

class LoginDialog extends React.Component {
  state = { ...defaultState };

  signInWithFacebook = event => {
    this.setState({ ...defaultState, loading: true });
    auth
      .signIn()
      .then(() => {
        this.setState(defaultState);
        this.props.onClose(event);
      })
      .catch(err => {
        console.error(err);
        this.setState({ ...defaultState, error: err.messsage });
      });
  };

  render() {
    return (
      <Dialog {...this.props}>
        <Title>Sign In</Title>
        <DialogContent>
          <Button
            color="primary"
            variant="raised"
            disabled={this.state.loading}
            onClick={this.signInWithFacebook}
          >
            Sign in with Facebook
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LoginDialog;
