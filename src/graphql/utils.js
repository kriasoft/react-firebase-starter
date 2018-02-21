/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

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
