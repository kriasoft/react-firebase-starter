/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console */

const tasks = new Map();

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function task(name, desc, action) {
  tasks.set(name, { desc, action });
}

function run(name) {
  const start = new Date();
  console.log(`[${format(start)}] Starting '${name}'...`);
  return Promise.resolve().then(() => tasks.get(name).action()).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`[${format(end)}] Finished '${name}' after ${time}ms`);
  }, err => console.error(err.stack));
}

process.nextTick(() => {
  const command = process.argv[2];
  if (tasks.has(command)) {
    run(command);
  } else if (command === undefined) {
    run('start');
  } else {
    console.log('Usage: node run <command> [options]\nCommands:');
    const maxNameLength = Math.max(...Array.from(tasks).map(([name]) => name.length)) + 1;
    tasks.forEach((value, key) => {
      console.log(`    ${key}${new Array(maxNameLength - key.length).join(' ')} - ${value.desc}`);
    });
  }
});

module.exports = { task, run };

