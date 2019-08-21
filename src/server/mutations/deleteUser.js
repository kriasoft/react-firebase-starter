/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import db from '../db';
import { fromGlobalId } from '../utils';

export const deleteUser = mutationWithClientMutationId({
  name: 'DeleteUser',
  description: 'Deletes a user.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  outputFields: {
    deletedUserId: {
      type: GraphQLString,
    },
  },

  async mutateAndGetPayload(input, ctx) {
    // Check permissions
    ctx.ensureIsAuthorized(user => user.isAdmin);

    const id = fromGlobalId(input.id, 'User');

    await db
      .table('users')
      .where({ id })
      .del();

    return { deletedUserId: input.id };
  },
});
