/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function task(name, action) {
  const start = new Date();
  console.log(`[${format(start)}] Starting '${name}'...`);
  return Promise.resolve(action instanceof Function ? action() : action).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`[${format(end)}] Finished '${name}' after ${time}ms`);
  }, err => console.error(err.stack));
}

module.exports = task;
