/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import UserType from './UserType';
import type Context from '../Context';

export const signIn = mutationWithClientMutationId({
  name: 'SignIn',
  description: 'Authenticate user by using JWT token.',

  inputFields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  outputFields: {
    me: {
      type: UserType,
    },
  },

  async mutateAndGetPayload(input: any, ctx: Context) {
    return {
      me: await ctx.signIn(input.token),
    };
  },
});

export const signOut = mutationWithClientMutationId({
  name: 'SignOut',
  description: 'Clear authentication cookie.',

  inputFields: {},
  outputFields: {},

  async mutateAndGetPayload(input: any, ctx: Context) {
    ctx.signOut();
    return {};
  },
});
