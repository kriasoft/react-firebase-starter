/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import { graphql, createFragmentContainer } from 'react-relay';
import type { Home_stories } from './__generated__/Home_stories.graphql';

import Link from '../Link';

const StoryList = styled.ul`padding: 0;`;

const Story = styled.li`
  padding-bottom: 0.5em;
  list-style: none;
`;

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
        <StoryList>
          {this.props.stories &&
            this.props.stories.edges.map(({ node: story }) => (
              <Story key={story.id}>
                <Link href={`/story-${story.id}`}>{story.title}</Link>
              </Story>
            ))}
        </StoryList>
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
