/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../Node';
import type Context from '../Context';

export default new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    username: {
      type: new GraphQLNonNull(GraphQLString),
    },

    email: {
      type: GraphQLString,
      resolve(user, args, ctx: Context) {
        return ctx.user && (ctx.user.id === user.id || ctx.user.isAdmin)
          ? user.email
          : null;
      },
    },

    displayName: {
      type: GraphQLString,
      resolve(user) {
        return user.display_name;
      },
    },

    photoURL: {
      type: GraphQLString,
      resolve(user) {
        return user.photo_url;
      },
    },

    isAdmin: {
      type: GraphQLBoolean,
      resolve: x => x.is_admin,
    },

    createdAt: {
      type: GraphQLString,
      resolve: x => x.created_at,
    },
  },
});
