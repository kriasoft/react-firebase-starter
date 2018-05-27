/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import moment from 'moment-timezone';
import { GraphQLString } from 'graphql';
import { fromGlobalId as parse } from 'graphql-relay';
import type { GraphQLFieldConfig } from 'graphql';

import type Context from './Context';

export function fromGlobalId(globalId, expectedType) {
  const { id, type } = parse(globalId);

  if (expectedType && type !== expectedType) {
    throw new Error(
      `Expected an ID of type '${expectedType}' but got '${type}'.`,
    );
  }

  return id;
}

export function assignType(type: string) {
  return (obj: any) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    if (obj) obj.__type = type;
    return obj;
  };
}

export function getType(obj: any) {
  // eslint-disable-next-line no-underscore-dangle
  return obj ? obj.__type : undefined;
}

export function mapTo(
  keys: Array<string | number>,
  keyFn: any => string | number,
) {
  return (rows: Array<any>) => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values());
  };
}

export function mapToMany(
  keys: Array<string | number>,
  keyFn: any => string | number,
) {
  return (rows: Array<any>) => {
    const group = new Map(keys.map(key => [key, []]));
    rows.forEach(row => (group.get(keyFn(row)) || []).push(row));
    return Array.from(group.values());
  };
}

export function mapToValues(
  keys: Array<string | number>,
  keyFn: any => string | number,
  valueFn: any => any,
) {
  return (rows: Array<any>) => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), valueFn(row)));
    return Array.from(group.values());
  };
}

const dateFieldArgs = {
  format: { type: GraphQLString },
};

const dateFieldResolve = (resolve, self, args, ctx: Context) => {
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
export function dateField(resolve: any => ?Date): GraphQLFieldConfig<*, *> {
  return {
    type: GraphQLString,
    args: dateFieldArgs,
    resolve: dateFieldResolve.bind(undefined, resolve),
  };
}
