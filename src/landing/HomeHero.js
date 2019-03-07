/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import LoginButton from '../common/LoginButton';

const styles = theme => ({
  root: {
    ...theme.mixins.content,
    paddingTop: '2rem',
    paddingBottom: '3rem',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '4rem',
    },
  },
  title: {
    paddingBottom: '1rem',
    fontWeight: 300,
    fontSize: '1.75rem',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
    },
  },
  subTitle: {
    paddingBottom: '1rem',
    color: theme.palette.common.white,
    fontWeight: 300,
    fontSize: '1.125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
  },
  actions: {
    paddingTop: '1rem',
  },
  button: {
    boxShadow: 'none',
    backgroundColor: '#555',
    '&:hover': {
      backgroundColor: '#666',
    },
  },
});

function HomeHero({ classes: s, ...props }) {
  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h3">
        Flying start for makers
      </Typography>
      <Typography className={s.subTitle} variant="h5">
        Quickly bootstrap new web application projects on a solid
        JavaScript-based tech stack and serverless architecture
      </Typography>
      <div className={s.actions}>
        <LoginButton className={s.button} provider="google" />
      </div>
    </div>
  );
}

export default withStyles(styles)(HomeHero);
