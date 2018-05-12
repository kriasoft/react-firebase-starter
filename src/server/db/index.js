/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import fs from 'fs';
import path from 'path';
import knex from 'knex';
import { config } from 'firebase-functions';

function read(file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
}

export { default as findUserByCredentials } from './findUserByCredentials';

export default knex(
  process.env.GCP_PROJECT
    ? // Firebase environment
      {
        client: 'pg',
        connection: {
          max: 1,
          host: `/cloudsql/${process.env.GCP_PROJECT}:us-central1:db`,
          ...config().db,
        },
      }
    : // Local/dev environment
      {
        client: 'pg',
        connection: {
          ssl:
            (process.env.PGSSLMODE || 'disable') !== 'disable'
              ? {
                  rejectUnauthorized: false,
                  cert: read(process.env.PGSSLCERT),
                  key: read(process.env.PGSSLKEY),
                  ca: read(process.env.PGSSLROOTCERT),
                }
              : undefined,
        },
      },
);
