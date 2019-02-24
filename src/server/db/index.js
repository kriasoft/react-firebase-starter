/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import fs from 'fs';
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    // Database connection pool must be set to max 1
    // when running in serverless environment.
    max: 1,
    // https://github.com/tgriesser/knex/issues/852
    ssl: (process.env.PGSSLMODE || 'disable') !== 'disable' && {
      rejectUnauthorized: false,
      cert: fs.readFileSync(process.env.PGSSLCERT, 'utf8'),
      key: fs.readFileSync(process.env.PGSSLKEY, 'utf8'),
      ca: fs.readFileSync(process.env.PGSSLROOTCERT, 'utf8'),
    },
  },
});

export { default as findUserByCredentials } from './findUserByCredentials';
export default db;
