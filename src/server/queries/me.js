/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { UserType } from '../user';

export default {
  type: UserType,

  resolve(root, args, ctx) {
    return ctx.user ? ctx.userById.load(ctx.user.id) : null;
  },
};
