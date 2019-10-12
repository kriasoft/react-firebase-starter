/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import clsx from 'clsx';
import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { createFragmentContainer, graphql } from 'react-relay';
import { Typography } from '@material-ui/core';

import Link from './Link';
import { useConfig, useHistory } from '../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#3f51b5',
    backgroundImage: 'linear-gradient(-225deg, #3db0ef, #5e5bb7)',
  },
  title: {
    fontFamily: theme.typography.monoFamily,
    fontWeight: 300,
    fontSize: '1.25rem',
  },
  titleLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

function AppBar(props) {
  const { className, me, relay, close, children, ...other } = props;
  const { app } = useConfig();
  const history = useHistory();
  const s = useStyles();

  function handleClose() {
    history.replace('/');
  }

  return (
    <MuiAppBar className={clsx(s.root, className)} elevation={0} {...other}>
      <Toolbar>
        <Typography className={s.title} variant="h1">
          <Link className={s.titleLink} href="/">
            {app.name}
          </Link>
        </Typography>
        <span style={{ flexGrow: 1 }} />
        {children}
        {close && (
          <IconButton onClick={handleClose} color="inherit">
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

export default createFragmentContainer(AppBar, {
  me: graphql`
    fragment AppBar_me on User {
      id
    }
  `,
});
