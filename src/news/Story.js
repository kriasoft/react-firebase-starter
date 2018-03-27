/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../components/Link';

class Story extends React.Component<{}> {
  render() {
    const { title, text, isURL } = this.props.data;
    return (
      <>
        <Typography variant="title" gutterBottom>
          {title}
        </Typography>
        {isURL ? (
          <Typography variant="body1">
            <a href={text}>{text}</a>
          </Typography>
        ) : (
          text &&
          text.split('\n').map(x => (
            <Typography variant="body1" gutterBottom>
              {x}
            </Typography>
          ))
        )}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <Button component={Link} href="/news">
            Go back
          </Button>
        </div>
      </>
    );
  }
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
