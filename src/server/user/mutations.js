/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import db from '../db';
import UserType from './UserType';
import { fromGlobalId } from '../utils';
import type Context from '../Context';

export const updateUser = mutationWithClientMutationId({
  name: 'UpdateUser',
  description: 'Update user.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    timeZone: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    user: { type: UserType },
  },

  async mutateAndGetPayload(input: any, ctx: Context) {
    const id = fromGlobalId(input.id, 'User');

    // Only the account owner or an admin can edit a user
    ctx.ensureIsAuthorized(user => user.id === id || user.isAdmin);

    function usernameAvailable(username) {
      return db
        .table('users')
        .where({ username })
        .whereNot({ id })
        .select(1)
        .then(x => !x.length);
    }

    // Validate and sanitize user input
    const data = await ctx.validate(input)(x =>
      x
        .field('username', { trim: true })
        .isLength({ min: 1, max: 50 })
        .is(usernameAvailable, 'That username is taken. Try another.')

        .field('email')
        .isLength({ max: 100 })
        .isEmail()

        .field('displayName', { as: 'display_name', trim: true })
        .isLength({ min: 1, max: 100 })

        .field('photoURL', { as: 'photo_url' })
        .isLength({ max: 250 })
        .isURL()

        .field('timeZone', { as: 'time_zone' })
        .isLength({ max: 50 })

        .field('isAdmin', { as: 'is_admin' })
        .is(() => ctx.user.isAdmin, 'Only admins can change this field.'),
    );

    if (input.validateOnly) {
      return { user: null };
    }

    if (Object.keys(data).length) {
      await db
        .table('users')
        .where({ id })
        .update({ ...data, updated_at: db.fn.now() });
    }

    const user = await db
      .table('users')
      .where({ id })
      .first();

    return { user };
  },
});

export const deleteUser = mutationWithClientMutationId({
  name: 'DeleteUser',
  description: 'Delete user.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedUserId: {
      type: GraphQLString,
    },
  },

  async mutateAndGetPayload(input: any, ctx: Context) {
    // Only an admin can delete a user
    ctx.ensureIsAuthorized(user => user.isAdmin);
    const id = fromGlobalId(input.id, 'User');

    await db
      .table('users')
      .where({ id })
      .del();

    return { deletedUserId: input.id };
  },
});
