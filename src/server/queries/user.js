/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLNonNull, GraphQLString } from 'graphql';

import { UserType } from '../user';

export default {
  type: UserType,

  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },

  resolve(root, { username }, ctx) {
    return ctx.userByUsername.load(username);
  },
};
