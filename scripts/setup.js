/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

'use script';

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
  delete process.env.PGDATABASE;

  db = new knex(config);

  const { rowCount } = await db.raw(
    'SELECT 1 FROM pg_database WHERE datname = ?',
    [database],
  );

  // If the database doesn't exist, create a new one
  if (!rowCount) {
    console.log(`Creating a new database "${database}"...`);
    await db.raw('CREATE DATABASE ??', [database]);
  }

  await db.destroy();

  db = knex(config);
  process.env.PGDATABASE = database;

  // Make sure that the required PostgreSQL extensions are installed
  await db.raw('CREATE EXTENSION IF NOT EXISTS ??', ['uuid-ossp']);
  await db.raw('CREATE EXTENSION IF NOT EXISTS ??', ['hstore']);

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
