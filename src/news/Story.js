/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../common/Link';

const styles = theme => ({
  root: {
    ...theme.mixins.content,
  },
});

function Story({ classes: s, data: { title, text, isURL } }) {
  return (
    <div className={s.root}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {isURL ? (
        <Typography>
          <a href={text}>{text}</a>
        </Typography>
      ) : (
        text &&
        text.split('\n').map(x => <Typography gutterBottom>{x}</Typography>)
      )}
      <div style={{ marginTop: 10, textAlign: 'right' }}>
        <Button component={Link} href="/news">
          Go back
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(
  createFragmentContainer(
    Story,
    graphql`
      fragment Story on Story {
        title
        text
        isURL
      }
    `,
  ),
);
