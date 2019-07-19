/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import db from '../db';
import StoryType from './StoryType';

export const story = {
  type: StoryType,

  args: {
    slug: { type: new GraphQLNonNull(GraphQLString) },
  },

  resolve(root, { slug }, ctx) {
    return ctx.storyBySlug.load(slug);
  },
};

export const stories = {
  type: new GraphQLList(StoryType),

  resolve(_, args, ctx) {
    return db
      .table('stories')
      .where({ approved: true })
      .orWhere({ approved: false, author_id: ctx.user ? ctx.user.id : null })
      .orderBy('created_at', 'desc')
      .limit(100)
      .select();
  },
};
