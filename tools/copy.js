/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const cpy = require('cpy');
const task = require('./task');
const routes = require('../routes.json');

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
module.exports = task('copy', Promise.resolve()
  .then(() => cpy(['static/**/*.*'], 'build'))
  .then(() => {
    // Create a static HTML page for each route
    const html = fs.readFileSync(path.resolve(__dirname, '../static/index.html'), 'utf8');
    for (const route of routes) {
      if (route.path.includes(':') || route.path === '/') continue;
      const filename = path.resolve(__dirname, '../build', `${route.path.substr(1)}.html`);
      fs.writeFileSync(filename, html, 'utf8');
    }
    fs.writeFileSync(path.resolve(__dirname, '../build/404.html'), html, 'utf8');
  })
);
