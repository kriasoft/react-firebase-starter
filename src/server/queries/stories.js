/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLList } from 'graphql';

import db from '../db';
import { StoryType } from '../story';

export default {
  type: new GraphQLList(StoryType),

  resolve(self, args, ctx) {
    return db
      .table('stories')
      .where({ approved: true })
      .orWhere({ approved: false, author_id: ctx.user ? ctx.user.id : null })
      .orderBy('created_at', 'desc')
      .limit(100)
      .select();
  },
};
