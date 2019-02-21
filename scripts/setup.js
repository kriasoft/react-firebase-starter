/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const cp = require('child_process');

let db;
let status;

(async () => {
  // Install Node.js dependencies
  ({ status } = cp.spawnSync('yarn', ['install'], { stdio: 'inherit' }));
  if (status !== 0) process.exit(status);

  const knex = require('knex');
  const config = require('../knexfile');

  // Check if database already exists
  const database = process.env.PGDATABASE;

  db = knex({
    ...config,
    connection: { ...config.connection, database: 'postgres' },
  });

  const { rowCount } = await db.raw(
    'SELECT 1 FROM pg_database WHERE datname = ?',
    [database],
  );

  // Create a new database if it doesn't exist
  if (!rowCount) {
    console.log(`Creating a new database "${database}"...`);
    await db.raw('CREATE DATABASE ??', [database]);
  }

  await db.destroy();

  db = knex(config);

  await db.destroy();

  // Migrate database schema to the latest version
  ({ status } = cp.spawnSync('yarn', ['db-migrate'], { stdio: 'inherit' }));
  if (status !== 0) process.exit(status);

  // Pre-compile GraphQL queries
  ({ status } = cp.spawnSync('yarn', ['relay'], { stdio: 'inherit' }));
  if (status !== 0) process.exit(status);
})().catch(async err => {
  console.error(err);
  if (db) await db.destroy();
  process.exit(1);
});
