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
const del = require('del');
const cpy = require('cpy');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const cp = require('child_process');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const tasks = new Map();
const config = require('./webpack.config');
const routes = require('./routes.json');

/* eslint-disable no-console, global-require */

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
tasks.set('clean', () => del(['build/*', '!build/.git'], { dot: true }));

//
// Copy static files into the output directory
// -----------------------------------------------------------------------------
tasks.set('copy', () => cpy(['static/**/*.*'], 'build'));

//
// Generate static HTML pages based on routes.json
// -----------------------------------------------------------------------------
tasks.set('pages', () => {
  const assets = JSON.parse(fs.readFileSync('./build/assets.json', 'utf8'));
  const html = fs.readFileSync('./static/index.html', 'utf8')
    .replace(/"\/main\.js"/, `"${assets.main.js}"`);
  for (const route of routes) {
    if (route.path.includes(':')) continue;
    const filename = `./build/${route.path.substr(1) || 'index'}.html`;
    fs.writeFileSync(filename, html, 'utf8');
    if (route.path !== '/') {
      mkdirp.sync(`./build/${route.path.substr(1)}`);
      fs.writeFileSync(`./build/${route.path.substr(1)}/index.html`, html, 'utf8');
    }
  }
  fs.writeFileSync('./build/404.html', html, 'utf8');
});

// Bundle JavaScript, CSS and image files with Webpack
tasks.set('bundle', () =>
  new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(config.stats));
        resolve();
      }
    });
  })
);

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () => Promise.resolve()
  .then(() => run('clean'))
  .then(() => run('copy'))
  .then(() => run('bundle'))
  .then(() => run('pages'))
);

//
// Build and publish the website
// -----------------------------------------------------------------------------
tasks.set('publish', () => run('publish:gh'));

//
// Build and publish the website to GitHub Pages
// -----------------------------------------------------------------------------
tasks.set('publish:gh', () => {
  const remote = {
    url: 'https://github.com/<owner>/<repo>.git', // TODO: Update deployment URL
    branch: 'gh-pages',
  };
  const opts = { cwd: path.resolve(__dirname, './build'), stdio: ['ignore', 'inherit', 'inherit'] };
  const git = (...args) => new Promise((resolve, reject) => {
    cp.spawn('git', args, opts).on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`git ${args.join(' ')} => ${code} (error)`));
      }
    });
  });

  return Promise.resolve()
    .then(() => run('clean'))
    .then(() => git('init', '--quiet'))
    .then(() => git('config', '--get', 'remote.origin.url')
      .then(() => git('remote', 'set-url', 'origin', remote.url))
      .catch(() => git('remote', 'add', 'origin', remote.url))
    )
    .then(() => git('ls-remote', '--exit-code', remote.url, 'master')
      .then(() => Promise.resolve()
        .then(() => git('fetch', 'origin'))
        .then(() => git('reset', `origin/${remote.branch}`, '--hard'))
        .then(() => git('clean', '--force'))
      )
      .catch(() => Promise.resolve())
    )
    .then(() => run('build'))
    .then(() => git('add', '.', '--all'))
    .then(() => git('commit', '--message', new Date().toUTCString())
      .catch(() => Promise.resolve()))
    .then(() => git('push', 'origin', `HEAD:${remote.branch}`, '--force', '--set-upstream'));
});

//
// Build and publish the website to Amazon S3
// -----------------------------------------------------------------------------
tasks.set('publish:s3', () => {
  const s3 = require('s3');
  return run('build').then(() => new Promise((resolve, reject) => {
    const client = s3.createClient({
      s3Options: {
        region: 'us-east-1',
        sslEnabled: true,
      },
    });
    const uploader = client.uploadDir({
      localDir: 'build',
      deleteRemoved: true,
      s3Params: { Bucket: 'www.example.com' }, // TODO: Update deployment URL
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  }));
});

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('start', () =>
  new Promise(resolve => {
    // Hot Module Replacement (HMR) + React Hot Reload
    if (config.debug) {
      config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
      config.module.loaders.find(x => x.loader === 'babel-loader')
        .query.plugins.unshift('react-hot-loader/babel');
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
      config.plugins.push(new webpack.NoErrorsPlugin());
    }

    const bundler = webpack(config);

    browserSync({
      server: {
        baseDir: 'static',

        middleware: [
          webpackDevMiddleware(bundler, {
            // IMPORTANT: dev middleware can't access config, so we should
            // provide publicPath by ourselves
            publicPath: config.output.publicPath,

            // pretty colored output
            stats: config.stats,

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
        'build/**/*.css',
        'build/**/*.html',
      ],
    });

    resolve();
  })
);

// Execute the specified task or default one. E.g.: node run build
run(process.argv[2] || 'start');
