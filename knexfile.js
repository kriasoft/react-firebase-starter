/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const dotenv = require('dotenv');
const { env } = require('minimist')(process.argv.slice(2));

dotenv.config({ path: `.env.${env === 'prod' ? 'production' : env}` });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Knex configuration
// http://knexjs.org/#knexfile
module.exports = {
  client: 'pg',
  migrations: {
    tableName: 'migrations',
  },
  connection: {
    max: 1,
    ssl: (process.env.PGSSLMODE || 'disable') !== 'disable' && {
      rejectUnauthorized: false,
      cert: fs.readFileSync(process.env.PGSSLCERT, 'utf8'),
      key: fs.readFileSync(process.env.PGSSLKEY, 'utf8'),
      ca: fs.readFileSync(process.env.PGSSLROOTCERT, 'utf8'),
    },
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
