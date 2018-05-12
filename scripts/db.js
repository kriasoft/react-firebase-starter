/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const { spawn } = require('child_process');
require('./env');

const opts = { stdio: 'inherit' };

if (process.env.PGSSLKEY) {
  spawn('chmod', ['0600', process.env.PGSSLKEY], opts);
}

spawn('psql', opts);
