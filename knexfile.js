/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const path = require('path');
require('./scripts/env');

function read(file) {
  return fs.readFileSync(path.resolve(__dirname, file), 'utf8');
}

// Knex configuration
// http://knexjs.org/#knexfile
module.exports = {
  client: 'pg',
  migrations: {
    tableName: 'migrations',
  },
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
