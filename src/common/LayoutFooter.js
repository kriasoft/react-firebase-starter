/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from './Link';

const styles = theme => ({
  container: {
    maxWidth: 640,
    margin: '0 auto',
    color: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    padding: '1em',
  },
  copyright: {
    paddingRight: '0.5em',
  },
  separator: {
    paddingRight: '0.5em',
    paddingLeft: '0.5em',
  },
  link: {
    color: 'rgba(0, 0, 0, 0.6)',
    textDecoration: 'none',
    '&:hover': {
      textDocoration: 'underline',
    },
  },
});

function LayoutFooter({ classes: s }) {
  return (
    <div className={s.container}>
      <Typography className={s.text}>
        <span className={s.copyright}>&copy; 2015-present</span>
        <a className={s.link} href="https://github.com/kriasoft">
          Kriasoft
        </a>
        <span className={s.separator}>|</span>
        <Link className={s.link} href="/about">
          About Us
        </Link>
        <span className={s.separator}>|</span>
        <Link className={s.link} href="/terms">
          Terms
        </Link>
        <span className={s.separator}>|</span>
        <Link className={s.link} href="/privacy">
          Privacy
        </Link>
        <span className={s.separator}>|</span>
        <Link className={s.link} href="/not-found">
          Not Found
        </Link>
      </Typography>
    </div>
  );
}

export default withStyles(styles)(LayoutFooter);
