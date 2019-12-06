/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLNonNull, GraphQLString } from 'graphql';
import {
  connectionDefinitions,
  forwardConnectionArgs,
  connectionFromArraySlice,
  cursorToOffset,
} from 'graphql-relay';

import db from '../db';
import { countField } from '../utils';
import { UserType } from '../types';

export const me = {
  type: UserType,

  resolve(root, args, ctx) {
    return ctx.user ? ctx.userById.load(ctx.user.id) : null;
  },
};

export const user = {
  type: UserType,

  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },

  resolve(root, { username }, ctx) {
    return ctx.userByUsername.load(username);
  },
};

export const users = {
  type: connectionDefinitions({
    name: 'User',
    nodeType: UserType,
    connectionFields: { totalCount: countField },
  }).connectionType,

  args: forwardConnectionArgs,

  async resolve(root, args, ctx) {
    // Only admins are allowed to fetch the list of users
    ctx.ensureIsAuthorized(user => user.isAdmin);

    const query = db.table('users');

    const limit = args.first === undefined ? 50 : args.first;
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

    const data = await query
      .clone()
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'desc')
      .select();

    data.forEach(x => {
      ctx.userById.prime(x.id, x);
      ctx.userByUsername.prime(x.username, x);
    });

    return {
      ...connectionFromArraySlice(data, args, {
        sliceStart: offset,
        arrayLength: offset + data.length,
      }),
      query,
    };
  },
};
