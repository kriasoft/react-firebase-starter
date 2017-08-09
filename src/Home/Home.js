/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { Home_stories } from './__generated__/Home_stories.graphql';

import Link from '../Link';
import s from './Home.css';

class Home extends React.Component {
  props: {
    stories: Home_stories,
  };

  render() {
    return (
      <div className={s.root}>
        <h2>Welcome to React Static Boilerplate</h2>
        <p>
          Below is the list of "stories" fetched from{' '}
          <a href="https://graphql-demo.kriasoft.com/">
            graphql-demo.kriasoft.com
          </a>{' '}
          as an example:
        </p>
        <ul className={s.stories}>
          {this.props.stories &&
            this.props.stories.edges.map(({ node: story }) =>
              <li key={story.id} className={s.story}>
                <Link href={`/story-${story.id}`}>
                  {story.title}
                </Link>
              </li>,
            )}
        </ul>
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
