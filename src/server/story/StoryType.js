/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import UserType from '../user/UserType';
import CommentType from './CommentType';
import { nodeInterface } from '../Node';
import type Context from '../Context';

export default new GraphQLObjectType({
  name: 'Story',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx: Context) {
        return ctx.userById.load(self.author_id);
      },
    },

    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },

    title: {
      type: new GraphQLNonNull(GraphQLString),
    },

    text: {
      type: new GraphQLNonNull(GraphQLString),
    },

    isURL: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(self) {
        return self.is_url;
      },
    },

    comments: {
      type: new GraphQLList(CommentType),
      resolve(self, args, ctx: Context) {
        return ctx.commentsByStoryId.load(self.id);
      },
    },

    pointsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(self, args, ctx: Context) {
        return ctx.storyPointsCount.load(self.id);
      },
    },

    commentsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(self, args, ctx: Context) {
        return ctx.storyCommentsCount.load(self.id);
      },
    },

    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(self) {
        return self.created_at;
      },
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(self) {
        return self.updated_at;
      },
    },
  },
});
