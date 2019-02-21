/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    padding: '2em 0 5em',
    backgroundColor: '#3f51b5',
    backgroundImage: 'linear-gradient(-225deg, #3db0ef, #5e5bb7)',
    flexShrink: 0,
  },
  container: {
    maxWidth: 640,
    margin: '0 auto',
  },
  title: {
    padding: 0,
    margin: '0 1rem 0.5em',
    fontFamily: "'Roboto Mono', Roboto, Arial, sans-serif",
    fontSize: '2em',
    fontWeight: 100,
    color: '#fff',
  },
  summary: {
    padding: 0,
    margin: '0 1rem',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '1em',
    fontWeight: 100,
    lineHeight: '1.5em',
    color: '#fff',
    letterSpacing: 1,
    '&& strong': {
      fontWeight: 300,
    },
  },
};

function LayoutHeader({ classes: s }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>React Starter Kit</h1>
        <p className={s.summary}>
          Bootstrap new <strong>React.js</strong> + <strong>Firebase</strong>{' '}
          application projects
          <br />
          in minutes, using modern mainstream libraries and tooling
          <br />
          with zero dependency on 3rd party frameworks.
        </p>
      </div>
    </div>
  );
}

export default withStyles(styles)(LayoutHeader);
