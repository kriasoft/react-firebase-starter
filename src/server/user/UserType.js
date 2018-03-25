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

import IdentityType from './IdentityType';
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
      resolve(self, args, ctx: Context) {
        return ctx.user && (ctx.user.id === self.id || ctx.user.isAdmin)
          ? self.email
          : null;
      },
    },

    displayName: {
      type: GraphQLString,
      resolve(self) {
        return self.display_name;
      },
    },

    photoURL: {
      type: GraphQLString,
      resolve(self) {
        return self.photo_url;
      },
    },

    identities: {
      type: new GraphQLList(IdentityType),
      resolve(self, args, ctx) {
        return ctx.identitiesByUserId.load(self.id);
      },
    },

    isAdmin: {
      type: GraphQLBoolean,
      resolve(self, args, ctx: Context) {
        return ctx.user && ctx.user.id === self.id
          ? ctx.user.isAdmin || false
          : self.is_admin;
      },
    },

    createdAt: {
      type: GraphQLString,
      resolve(self) {
        return self.created_at;
      },
    },

    updatedAt: {
      type: GraphQLString,
      resolve(self) {
        return self.updated_at;
      },
    },

    lastSignInAt: {
      type: GraphQLString,
      resolve(self) {
        return self.last_signin_at;
      },
    },
  },
});
