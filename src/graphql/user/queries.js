/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';
import {
  connectionDefinitions,
  forwardConnectionArgs,
  connectionFromArraySlice,
  cursorToOffset,
} from 'graphql-relay';

import db from '../db';
import UserType from './UserType';
import type Context from '../Context';

export const me = {
  type: UserType,

  resolve(root, args, ctx: Context) {
    return ctx.user ? ctx.userById.load(ctx.user.id) : null;
  },
};

export const user = {
  type: UserType,

  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },

  resolve(root, { username }, ctx: Context) {
    return ctx.userByUsername.load(username);
  },
};

export const users = {
  type: connectionDefinitions({
    name: 'User',
    nodeType: UserType,
    connectionFields: {
      totalCount: { type: new GraphQLNonNull(GraphQLInt) },
    },
  }).connectionType,

  args: forwardConnectionArgs,

  async resolve(root, args, ctx: Context) {
    // Only admins allowed to fetch the list of users
    ctx.ensureIsAuthorized(user => user.isAdmin);

    const limit = typeof args.first === 'undefined' ? '100' : args.first;
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

    const [data, totalCount] = await Promise.all([
      db
        .table('users')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
        .then(rows => {
          rows.forEach(x => ctx.userById.prime(x.id, x));
          return rows;
        }),
      db
        .table('users')
        .count()
        .then(x => x[0].count),
    ]);

    return {
      ...connectionFromArraySlice(data, args, {
        sliceStart: offset,
        arrayLength: totalCount,
      }),
      totalCount,
    };
  },
};
