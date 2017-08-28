/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import glamorous from 'glamorous';
import { graphql, createFragmentContainer } from 'react-relay';
import type { Home_stories } from './__generated__/Home_stories.graphql';

import Link from '../Link';

const List = glamorous.ul({
  padding: 0,
});

const ListItem = glamorous.li({
  paddingBottom: '0.5em',
  listStyle: 'none',
});

class Home extends React.Component {
  props: {
    stories: Home_stories,
  };

  render() {
    return (
      <div>
        <h2>Welcome to React Static Boilerplate</h2>
        <p>
          Below is the list of "stories" fetched from{' '}
          <a href="https://graphql-demo.kriasoft.com/">
            graphql-demo.kriasoft.com
          </a>{' '}
          as an example:
        </p>
        <List>
          {this.props.stories &&
            this.props.stories.edges.map(({ node: story }) =>
              <ListItem key={story.id}>
                <Link href={`/story-${story.id}`}>
                  {story.title}
                </Link>
              </ListItem>,
            )}
        </List>
      </div>
    );
  }
}

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_stories on StoryConnection {
      edges {
        node {
          id
          title
        }
      }
    }
  `,
);
