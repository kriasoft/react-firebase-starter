/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

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

// Knex configuration
// http://knexjs.org/#knexfile
module.exports = {
  client: 'pg',
  connection,
  migrations: { tableName: 'migrations' },
  // The order in which data is being saved or restored
  // when you run `yarn db-save` or `yarn db-seed`.
  tables: [
    'users',
    'user_identities',
    'user_tokens',
    'stories',
    'story_points',
    'comments',
    'comment_points',
  ],
};
