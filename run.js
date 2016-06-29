/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console, global-require */

const fs = require('fs');
const del = require('del');
const webpack = require('webpack');
const firebase = require('firebase-tools');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const tasks = new Map();

function run(task) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return Promise.resolve().then(() => tasks.get(task)()).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`Finished '${task}' after ${time}ms`);
  }, err => console.error(err.stack));
}

//
// Clean up the output directory
// -----------------------------------------------------------------------------
tasks.set('clean', () => del(['public/dist/*', '!public/dist/.git'], { dot: true }));

//
// Copy ./index.html into the /public folder
// -----------------------------------------------------------------------------
tasks.set('html', () => {
  const assets = JSON.parse(fs.readFileSync('./public/dist/assets.json', 'utf8'));
  const html = fs.readFileSync('./index.html', 'utf8')
    .replace(/"\/dist\/main\.js"/, `"${assets.main.js}"`);
  fs.writeFileSync('./public/index.html', html, 'utf8');
});

//
// Bundle JavaScript, CSS and image files with Webpack
// -----------------------------------------------------------------------------
tasks.set('bundle', () => {
  const webpackConfig = require('./webpack.config');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  });
});

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () => Promise.resolve()
  .then(() => run('clean'))
  .then(() => run('bundle'))
  .then(() => run('html'))
);

//
// Build and publish the website
// -----------------------------------------------------------------------------
tasks.set('publish', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  return run('build')
    .then(() => firebase.login({ nonInteractive: false }))
    .then(() => firebase.deploy({
      project: 'react-static-boilerplate', // TODO: Update project name
      cwd: __dirname,
    }))
    .then(() => { setTimeout(() => process.exit()); });
});

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('start', () => {
  global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
  const html = fs.readFileSync('./index.html', 'utf8');
  fs.writeFileSync('./public/index.html', html, 'utf8');
  const webpackConfig = require('./webpack.config');
  const bundler = webpack(webpackConfig);
  return new Promise(resolve => {
    browserSync({
      server: {
        baseDir: 'public',

        middleware: [
          webpackDevMiddleware(bundler, {
            // IMPORTANT: dev middleware can't access config, so we should
            // provide publicPath by ourselves
            publicPath: webpackConfig.output.publicPath,

            // pretty colored output
            stats: webpackConfig.stats,

            // for other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
          }),

          // bundler should be the same as above
          webpackHotMiddleware(bundler),

          // Serve index.html for all unknown requests
          (req, res, next) => {
            if (req.headers.accept.startsWith('text/html')) {
              req.url = '/index.html'; // eslint-disable-line no-param-reassign
            }
            next();
          },
        ],
      },

      // no need to watch '*.js' here, webpack will take care of it for us,
      // including full page reloads if HMR won't work
      files: [
        'public/**/*.css',
        'public/**/*.html',
      ],
    });

    resolve();
  });
});

// Execute the specified task or default one. E.g.: node run build
run(process.argv[2] || 'start');
