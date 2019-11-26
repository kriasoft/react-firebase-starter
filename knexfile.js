/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const cp = require('child_process');
const dotenv = require('dotenv');
const { env = 'dev' } = require('minimist')(process.argv.slice(2));

function getProjectID(env) {
  return `example-${env}`;
}

// Load API keys, secrets etc. from Firebase environment
// https://firebase.google.com/docs/functions/config-env
if (env === 'prod' || env === 'test') {
  const { status, stdout } = cp.spawnSync(
    'firebase',
    [`--project=${getProjectID(env)}`, 'functions:config:get'],
    { stdio: ['pipe', 'pipe', 'inherit'] },
  );

  if (status !== 0) process.exit(status);

  const config = JSON.parse(stdout.toString()).app;

  Object.keys(config).forEach(key => {
    process.env[key.toUpperCase()] =
      typeof key === 'object' ? JSON.stringify(config[key]) : config[key];
  });

  process.env.PGHOST = 'X.X.X.X';
  process.env.PGPOST = '5432';
  process.env.PGSSLMODE = 'require';
  process.env.PGSSLCERT = `./ssl/${env}.client-cert.pem`;
  process.env.PGSSLKEY = `./ssl/${env}.client-key.pem`;
  process.env.PGSSLROOTCERT = `./ssl/${env}.server-ca.pem`;
} else if (env === 'local') {
  dotenv.config({ path: '.env.local' });
  process.env.PGPORT = process.env.PGPORT || '5432';
  process.env.PGHOST = process.env.PGHOST || 'localhost';
  process.env.PGUSER = process.env.PGUSER || 'postgres';
  process.env.PGPASSWORD = process.env.PGPASSWORD || '';
  process.env.PGDATABASE = process.env.PGDATABASE || 'rsk_local';
  process.env.PGSSLMODE = process.env.PGSSLMODE || 'disable';
}

console.log('Environment:', env);
dotenv.config({ path: '.env' });

// Knex configuration that is used with DB migration scripts etc.
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
