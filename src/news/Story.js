/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../common/Link';

function Story({ data: { title, text, isURL } }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
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
    </>
  );
}

export default createFragmentContainer(
  Story,
  graphql`
    fragment Story on Story {
      title
      text
      isURL
    }
  `,
);
