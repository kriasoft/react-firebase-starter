/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import AccountType from './AccountType';
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

    accounts: {
      type: new GraphQLList(AccountType),
    },

    isAdmin: {
      type: GraphQLBoolean,
      resolve(user, args, ctx: Context) {
        return ctx.user && ctx.user.id === user.id
          ? ctx.user.isAdmin || false
          : user.is_admin;
      },
    },

    createdAt: {
      type: GraphQLString,
      resolve: x => x.created_at,
    },

    updatedAt: {
      type: GraphQLString,
      resolve: x => x.updated_at,
    },
  },
});
