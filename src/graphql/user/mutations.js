/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import db from '../../db';
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
    const me = await ctx.signIn(input.token);

    const user = await db
      .select()
      .from('users')
      .then(rows => {
        if (rows.length) return rows[0];

        return db
          .insert({
            id: me.uid,
            email: me.email,
            email_verified: me.emailVerified,
            display_name: me.displayName,
            photo_url: me.photoURL,
          })
          .into('users')
          .returning('*');
      });

    return { me: user };
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
