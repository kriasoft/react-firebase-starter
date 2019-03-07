/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import HomeSponsors from './HomeSponsors';
import HomeStack from './HomeStack';

const styles = theme => ({
  content: {
    ...theme.mixins.content,
  },
  title: {
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
  },
  code: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.common.white,
    backgroundColor: '#555',
    fontFamily: '"Roboto Mono"',
    fontWeight: 100,
    fontSize: '0.875rem',
    marginBottom: theme.spacing.unit * 3,
  },
  block: {},
});

function Home({ classes: s }) {
  return (
    <>
      <HomeSponsors />
      <div className={s.content}>
        <Typography className={s.title} variant="h4" gutterBottom>
          Getting Started
        </Typography>
        <Typography paragraph>
          Just clone the{' '}
          <a
            href="https://github.com/kriasoft/react-firebase-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            repository
          </a>
          , tweak environment variables found in .env.* files in the root of the
          project and start hacking.
        </Typography>
        <Paper className={s.code}>
          $ git clone https://github.com/kriasoft/react-firebase-starter.git
          example
          <br />
          $ cd ./example
          <br />
          $ yarn setup
          <br />$ yarn start
        </Paper>
        <Typography className={s.title} variant="h4" gutterBottom>
          Tech Stack
        </Typography>
        <Typography className={s.subTitle} paragraph>
          Save time. Create with confidence.
        </Typography>
        <HomeStack />
      </div>
    </>
  );
}

export default withStyles(styles)(Home);
