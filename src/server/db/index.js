/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: process.env.GCP_PROJECT ? { max: 1 } : {},
});

export { default as findUserByCredentials } from './findUserByCredentials';
export default db;
