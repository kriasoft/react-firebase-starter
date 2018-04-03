/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import _ from 'lodash';
import moment from 'moment';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

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
      args: {
        truncate: { type: GraphQLInt },
      },
      resolve(self, args) {
        return args.truncate
          ? _.truncate(self.text, { length: args.truncate })
          : self.text;
      },
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

    pointGiven: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(self, args, ctx: Context) {
        return ctx.user ? ctx.storyPointGiven.load(self.id) : false;
      },
    },

    commentsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(self, args, ctx: Context) {
        return ctx.storyCommentsCount.load(self.id);
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
  },
});
