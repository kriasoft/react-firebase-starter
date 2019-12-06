/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import moment from 'moment-timezone';
import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

const dateFieldArgs = {
  format: { type: GraphQLString },
};

const dateFieldResolve = (resolve, self, args, ctx) => {
  let date = resolve(self);

  if (!date) {
    return null;
  }

  const timeZone = ctx.user && ctx.user.timeZone;

  if (timeZone) {
    date = moment(date).tz(timeZone);
  } else {
    date = moment(date);
  }

  return date.format(args.format);
};

/**
 * Creates the configuration for a date/time field with support of format and time
 * zone.
 */
export function dateField(resolve) {
  return {
    type: GraphQLString,
    args: dateFieldArgs,
    resolve: dateFieldResolve.bind(undefined, resolve),
  };
}

export const countField = {
  type: new GraphQLNonNull(GraphQLInt),
  resolve(self) {
    return self.query.count().then(x => x[0].count);
  },
};
