/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { firestore } from 'firebase-admin';
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import StoryType from './StoryType';
import type Context from '../Context';

function map(snapshot) {
  return snapshot.docs.map(x => ({
    id: x.id,
    ...x.data(),
  }));
}

export const story = {
  type: StoryType,

  args: {
    slug: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(_, { slug }, ctx: Context) {
    const { docs: [story] } = await firestore()
      .collection('stories')
      .where('slug', '=', slug)
      .get();
    return { id: story.id, ...story.data() };
  },
};

export const stories = {
  type: new GraphQLList(StoryType),

  resolve(_, args, ctx: Context) {
    return Promise.all([
      // Fetch stories pending approval created by the current user ...
      ctx.user
        ? firestore()
            .collection('stories')
            .where('approved', '=', false)
            .where('authorId', '=', ctx.user.uid)
            .limit(50)
            .get()
            .then(map)
        : [],
      // ... concatenate them with the top 50 approved stories.
      firestore()
        .collection('stories')
        .where('approved', '=', true)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get()
        .then(map),
    ]).then(([a, b]) => [...a, ...b]);
  },
};
