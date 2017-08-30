/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { Story_story } from './__generated__/Story_story.graphql';

import s from './Story.css';

class Story extends React.Component {
  props: {
    story: Story_story,
  };

  render() {
    const story = this.props.story || {};
    return (
      <article className={s.root}>
        <h1>{story.title}</h1>
        <content>{story.text}</content>
      </article>
    );
  }
}

export default createFragmentContainer(
  Story,
  graphql`
    fragment Story_story on Story {
      id
      title
      text
    }
  `,
);
