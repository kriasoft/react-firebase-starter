/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import moment from 'moment-timezone';
import { GraphQLString } from 'graphql';
import { fromGlobalId as parse } from 'graphql-relay';

export function fromGlobalId(globalId, expectedType) {
  const { id, type } = parse(globalId);

  if (expectedType && type !== expectedType) {
    throw new Error(
      `Expected an ID of type '${expectedType}' but got '${type}'.`,
    );
  }

  return id;
}

export function assignType(type) {
  return obj => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    if (obj) obj.__type = type;
    return obj;
  };
}

export function getType(obj) {
  // eslint-disable-next-line no-underscore-dangle
  return obj ? obj.__type : undefined;
}

export function mapTo(keys, keyFn) {
  return rows => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values());
  };
}

export function mapToMany(keys, keyFn) {
  return rows => {
    const group = new Map(keys.map(key => [key, []]));
    rows.forEach(row => (group.get(keyFn(row)) || []).push(row));
    return Array.from(group.values());
  };
}

export function mapToValues(keys, keyFn, valueFn) {
  return rows => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), valueFn(row)));
    return Array.from(group.values());
  };
}

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
