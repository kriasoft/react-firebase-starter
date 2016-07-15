/**
 * Yeoman Generator Starter Kit
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console, global-require */

const del = require('del');
const tasks = new Map();

const options = {
  watch: process.argv.includes('--watch') || process.argv.includes('-w'),
};

function run(task) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return Promise.resolve().then(() => tasks.get(task)()).then(() => {
    console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
  }, err => console.error(err.stack));
}

//
// Clean up the output directory
// -----------------------------------------------------------------------------
tasks.set('clean', () => del(['generators/app/*.*']));

//
// Compile generator(s) from source files, e.g. src/app/index.js => generators/app/index.js, etc.
// -----------------------------------------------------------------------------
tasks.set('build', () => run('clean').then(() => new Promise((resolve, reject) => {
  require('child_process').spawn(
    'node',
    [
      'node_modules/babel-cli/bin/babel', 'src', '--out-dir', 'generators',
      '--source-maps', ...(options.watch ? ['--watch'] : []),
    ],
    {
      stdio: ['ignore', 'inherit', 'inherit'],
    }
  ).on('close', code => (code === 0 ? resolve() : reject()));
})));

// Execute the specified task or default one. E.g.: node run build
run(process.argv[2] || 'start');
