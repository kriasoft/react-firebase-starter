/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { env } = require('minimist')(process.argv.slice(2));

// Writes the current version number to ./VERSION file
const { status, stdout } = cp.spawnSync(
  'git',
  ['show', '--no-patch', '--format=%cd+%h', '--date=format:%Y.%m.%d'],
  { stdio: ['pipe', 'pipe', 'inherit'] },
);

if (status === 0) {
  fs.writeFileSync('./VERSION', stdout.toString().trim(), 'utf8');
} else {
  process.exit(status);
}

// Generates ./build/public/robots.txt file. See https://robotstxt.org/
fs.writeFileSync(
  path.resolve(__dirname, '../build/public/robots.txt'),
  env === 'prod' ? 'User-agent: *\nDisallow:' : 'User-agent: *\nDisallow: /',
  'utf8',
);
