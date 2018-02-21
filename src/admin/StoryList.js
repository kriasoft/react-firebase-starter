/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

class StoryList extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default createFragmentContainer(
  StoryList,
  graphql`
    fragment StoryListAdmin on Query {
      me {
        id
      }
    }
  `,
);
