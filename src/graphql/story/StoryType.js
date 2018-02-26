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
import CommentType from '../comment/CommentType';
import { nodeInterface } from '../Node';
import type Context from '../Context';

export default new GraphQLObjectType({
  name: 'Story',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(story, args, ctx: Context) {
        return ctx.userById.load(story.authorId);
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
    },

    comments: {
      type: new GraphQLList(CommentType),
      resolve(story, args, ctx: Context) {
        return ctx.commentsByStoryId.load(story.id);
      },
    },

    pointsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(story, args, ctx: Context) {
        return ctx.storyPointsCount.load(story.id);
      },
    },

    commentsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(story, args, ctx: Context) {
        return ctx.storyCommentsCount.load(story.id);
      },
    },

    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
