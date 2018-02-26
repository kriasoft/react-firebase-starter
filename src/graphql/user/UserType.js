/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../Node';
import type Context from '../Context';

export default new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField('User', x => x.uid),

    displayName: {
      type: GraphQLString,
    },

    photoURL: {
      type: GraphQLString,
    },

    email: {
      type: GraphQLString,
      resolve(user, args, ctx: Context) {
        return ctx.user && ctx.user.id === user.id ? user.email : null;
      },
    },
  },
});
