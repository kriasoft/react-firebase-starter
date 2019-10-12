/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import LoginForm from './LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginDialog = React.memo(function LoginDialog(props) {
  const [state, setState] = React.useState({});
  useAuth({ onLogin: resolve => setState({ resolve }) });

  function handleLoginComplete(user) {
    if (state.resolve) {
      state.resolve(user);
      handleClose();
    }
  }

  function handleClose() {
    setState({});
  }

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      {...props}
      open={Boolean(state.resolve)}
      onClose={handleClose}
    >
      <DialogContent>
        <LoginForm onLoginComplete={handleLoginComplete} />
      </DialogContent>
    </Dialog>
  );
});

export default LoginDialog;
