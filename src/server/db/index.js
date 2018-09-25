/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import fs from 'fs';
import knex from 'knex';

const connection = {};

if (process.env.NODE_ENV === 'production') {
  // Database connection pool must be set to max 1
  // when running in serverless environment.
  connection.max = 1;
}

// https://github.com/tgriesser/knex/issues/852
if (process.env.PGSSLMODE && process.env.PGSSLMODE !== 'disable') {
  connection.ssl = {
    rejectUnauthorized: false,
    ca: fs.readFileSync(process.env.PGSSLROOTCERT).toString(),
    key: fs.readFileSync(process.env.PGSSLKEY).toString(),
    cert: fs.readFileSync(process.env.PGSSLCERT).toString(),
  };
}

const db = knex({ client: 'pg', connection });

export { default as findUserByCredentials } from './findUserByCredentials';
export default db;
