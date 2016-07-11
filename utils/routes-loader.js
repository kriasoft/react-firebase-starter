/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const toRegExp = require('path-to-regexp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const frontmatter = require('front-matter');

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
 *     pattern: /^\\/about(?:\/(?=$))?$/i,
 *     keys: [],
 *     page: './pages/about',
 *     load: function () { return System.load('./pages/about'); }
 *   }
 */
module.exports = function routesLoader(source) {
  this.cacheable();

  const output = ['[\n'];
  const posts = glob.sync('./posts/*.md');
  const routes = JSON.parse(source);
  
  posts.forEach(post => {
    const file = fs.readFileSync(post, 'utf8');
    const date = path.basename(post, '.md').split('-');
    const fm = frontmatter(file);

    routes.push({
      path: path.join('/blog', date.shift(), date.shift(), date.shift(), date.join('-')),
      page: './pages/' + fm.attributes.page,
      data: [ post ]
    });
  });

  for (const route of routes) {
    const keys = [];
    const pattern = toRegExp(route.path, keys);
    const requirePage = route.path === '/' || route.path === '/error' ?
      `Promise.resolve(require('${route.page}'))` :
      `System.import('${route.page}')`;

    var requireData = [];
    if (route.data && route.data.length) {
      requireData = route.data.map(resource => {
        return `System.import('${resource}')`;
      });
    }

    const require = `[ ${requirePage}, ${requireData.join(', ')} ]`;
    output.push('  {\n');
    output.push(`    path: '${escape(route.path)}',\n`);
    output.push(`    pattern: ${pattern.toString()},\n`);
    output.push(`    keys: ${JSON.stringify(keys)},\n`);
    output.push(`    page: '${escape(route.page)}',\n`);
    output.push(`    load: function load() { return Promise.all(${require}); },\n`);
    output.push('  },\n');
  }

  output.push(']');

  return `module.exports = ${output.join('')};`;
};
