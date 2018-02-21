/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import UserType from './UserType';
import type Context from '../Context';

export const me = {
  type: UserType,

  resolve(root, args, ctx: Context) {
    return ctx.user;
  },
};
