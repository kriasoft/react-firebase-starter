/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const cp = require('child_process');

// Load environment variables (PGHOST, PGUSER, etc.)
require('../knexfile');

// Ensure that the SSL key file has correct permissions
if (process.env.PGSSLKEY) {
  cp.spawnSync('chmod', ['0600', process.env.PGSSLKEY], { stdio: 'inherit' });
}

cp.spawn(
  'psql',
  [
    '--file=backup.sql',
    '--echo-errors',
    '--no-readline',
    ...process.argv.slice(2).filter(x => !x.startsWith('--env')),
  ],
  {
    stdio: 'inherit',
  },
).on('exit', process.exit);
