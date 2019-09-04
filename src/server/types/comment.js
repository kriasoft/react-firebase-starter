/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { UserType } from './user';
import { StoryType } from './story';
import { nodeInterface } from '../node';
import { dateField } from '../utils';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),

    story: {
      type: new GraphQLNonNull(StoryType),
      resolve(self, args, ctx) {
        return ctx.storyById.load(self.story_id);
      },
    },

    parent: {
      type: CommentType,
      resolve(self, args, ctx) {
        return self.parent_id && ctx.commentById.load(self.parent_id);
      },
    },

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.author_id);
      },
    },

    comments: {
      type: new GraphQLList(CommentType),
      resolve(self, args, ctx) {
        return ctx.commentsByParentId.load(self.id);
      },
    },

    text: {
      type: GraphQLString,
    },

    pointsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(self, args, ctx) {
        return ctx.commentPointsCount.load(self.id);
      },
    },

    createdAt: dateField(self => self.created_at),
    updatedAt: dateField(self => self.updated_at),
  }),
});
