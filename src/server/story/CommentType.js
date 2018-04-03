/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import moment from 'moment';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import StoryType from './StoryType';
import UserType from '../user/UserType';
import { nodeInterface } from '../Node';
import type Context from '../Context';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),

    story: {
      type: new GraphQLNonNull(StoryType),
      resolve(self, args, ctx: Context) {
        return ctx.storyById.load(self.story_id);
      },
    },

    parent: {
      type: CommentType,
      resolve(self, args, ctx: Context) {
        return self.parent_id && ctx.commentById.load(self.parent_id);
      },
    },

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx: Context) {
        return ctx.userById.load(self.author_id);
      },
    },

    comments: {
      type: new GraphQLList(CommentType),
      resolve(self, args, ctx: Context) {
        return ctx.commentsByParentId.load(self.id);
      },
    },

    text: {
      type: GraphQLString,
    },

    pointsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(self, args, ctx: Context) {
        return ctx.commentPointsCount.load(self.id);
      },
    },

    createdAt: {
      type: GraphQLString,
      args: {
        format: { type: GraphQLString },
      },
      resolve(self, args) {
        return args.format
          ? moment(self.created_at).format(args.format)
          : self.created_at.toISOString();
      },
    },

    updatedAt: {
      type: GraphQLString,
      args: {
        format: { type: GraphQLString },
      },
      resolve(self, args) {
        return args.format
          ? moment(self.updated_at).format(args.format)
          : self.updated_at.toISOString();
      },
    },
  }),
});

export default CommentType;
