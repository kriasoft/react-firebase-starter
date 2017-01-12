/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const fs = require('fs');
const ejs = require('ejs');
const rimraf = require('rimraf');
const webpack = require('webpack');
const Browsersync = require('browser-sync');
const task = require('./task');
const config = require('./config');

global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)

// Build the app and launch it in a browser for testing via Browsersync
module.exports = task('run', () => new Promise((resolve) => {
  rimraf.sync('public/dist/*', { nosort: true, dot: true });
  let count = 0;
  const bs = Browsersync.create();
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  // Node.js middleware that compiles application in watch mode with HMR support
  // http://webpack.github.io/docs/webpack-dev-middleware.html
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats,
  });

  compiler.plugin('done', (stats) => {
    // Generate index.html page
    const bundle = stats.compilation.chunks.find(x => x.name === 'main').files[0];
    const template = fs.readFileSync('./public/index.ejs', 'utf8');
    const render = ejs.compile(template, { filename: './public/index.ejs' });
    const output = render({ debug: true, bundle: `/dist/${bundle}`, config });
    fs.writeFileSync('./public/index.html', output, 'utf8');

    // Launch Browsersync after the initial bundling is complete
    // For more information visit https://browsersync.io/docs/options
    count += 1;
    if (count === 1) {
      bs.init({
        port: process.env.PORT || 3000,
        ui: { port: Number(process.env.PORT || 3000) + 1 },
        server: {
          baseDir: 'public',
          middleware: [
            webpackDevMiddleware,
            require('webpack-hot-middleware')(compiler),
            require('connect-history-api-fallback')(),
          ],
        },
      }, resolve);
    }
  });
}));
