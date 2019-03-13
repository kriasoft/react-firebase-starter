/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const cp = require('child_process');
const dotenv = require('dotenv');
const { env } = require('minimist')(process.argv.slice(2));

// Load API keys, secrets etc. from Firebase environment
// https://firebase.google.com/docs/functions/config-env
if (env && env !== 'dev') {
  const { status, stdout } = cp.spawnSync(
    'firebase',
    [`--project=example-${env}`, 'functions:config:get'],
    { stdio: ['pipe', 'pipe', 'inherit'] },
  );

  if (status !== 0) process.exit(status);

  const config = JSON.parse(stdout.toString()).app;
  Object.keys(config).forEach(key => {
    process.env[key.toUpperCase()] =
      typeof key === 'object' ? JSON.stringify(config[key]) : config[key];
  });

  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  // delete process.env.PGHOST;
  // delete process.env.PGSSLMODE;
} else {
  dotenv.config({ path: '.env.local' });
}

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
};
