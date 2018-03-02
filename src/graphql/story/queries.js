/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import db from '../../db';
import StoryType from './StoryType';
import type Context from '../Context';

export const story = {
  type: StoryType,

  args: {
    slug: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(_, { slug }, ctx: Context) {
    return ctx.storyBySlug.load(slug);
  },
};

export const stories = {
  type: new GraphQLList(StoryType),

  resolve(_, args, ctx: Context) {
    function queryStories() {
      if (ctx.user) this.where({ author_id: ctx.user.uid });
      this.orWhereNot({ approved_at: null });
    }
    return db
      .select()
      .from('stories')
      .where(queryStories)
      .orderBy('created_at', 'desc')
      .limit(25);
  },
};
