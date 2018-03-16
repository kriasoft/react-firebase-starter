/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const fs = require('fs');
const path = require('path');

function read(file) {
  const filename = path.resolve(__dirname, `ssl/${file}`);
  return fs.readFileSync(filename, 'utf8');
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
            ca: read('server-ca.pem'),
            key: read('client-key.pem'),
            cert: read('client-cert.pem'),
          }
        : undefined,
  },
  tables: ['users', 'stories', 'story_points', 'comments', 'comment_points'],
};
