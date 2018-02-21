/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from 'material-ui/Typography';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../components/Link';

class Story extends React.Component<{}> {
  render() {
    const { title, text } = this.props.data;
    return (
      <>
        <Typography variant="title" gutterBottom>
          {title}
        </Typography>
        {text &&
          text.split('\n').map(x => (
            <Typography variant="body1" gutterBottom>
              {x}
            </Typography>
          ))}
        <Typography variant="body1">
          <Link href="/news">Go back</Link>
        </Typography>
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
    }
  `,
);
