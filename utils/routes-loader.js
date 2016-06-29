/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const toRegExp = require('path-to-regexp');

function escape(text) {
  return text.replace('\'', '\\\'').replace('\\', '\\\\');
}

/**
 * Converts application routes from JSON to JavaScript. For example, a route like
 *
 *   {
 *     "path": "/about",
 *     "page": "./pages/about"
 *   }
 *
 * becomes
 *
 *   {
 *     path: '/about',
 *     pattern: '/^\\/about(?:\/(?=$))?$/i',
 *     keys: [],
 *     page: function () { return new Promise(resolve => require(['./pages/about'], resolve)); }
 *   }
 */
module.exports = function routesLoader(source) {
  this.cacheable();

  const imports = [];
  const output = ['[\n'];
  const routes = JSON.parse(source);

  for (const route of routes) {
    const keys = [];
    const pattern = toRegExp(route.path, keys);
    const require = route.path === '/' || route.path === '/error' ?
      module => `Promise.resolve(require('${module}'))` :
      module => `new Promise(function (resolve, reject) {
        try {
          require.ensure(['${module}'], function (require) {
            resolve(require('${module}'));
          });
        } catch (err) {
          reject(err);
        }
      })`;
    output.push('  {\n');
    output.push(`    path: '${escape(route.path)}',\n`);
    output.push(`    pattern: '${escape(pattern.toString())}',\n`);
    output.push(`    keys: ${JSON.stringify(keys)},\n`);
    output.push(`    page: function page() { return ${require(escape(route.page))}; },\n`);
    output.push('  },\n');
  }

  output.push(']');

  return `module.exports = ${output.join('')};`;
};
