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
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const routes = require('./routes.json');
const { task, run } = require('./utils/task');


task('clean', 'Clean up the output directory', () =>
  del(['build/*', '!build/.git'], { dot: true })
);


task('copy', 'Copy static files into the output directory', () =>
  cpy(['static/**/*.*'], 'build')
);


task('pages', 'Generate static HTML pages based on routes.json', () => {
  const html = fs.readFileSync('./static/index.html', 'utf8');
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


task('bundle', 'Bundle JavaScript, CSS and image files with Webpack', () =>
  new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(config.stats)); // eslint-disable-line no-console
        resolve();
      }
    });
  })
);


task('build', 'Build website into a distributable format', () => Promise.resolve()
  .then(() => run('clean'))
  .then(() => run('copy'))
  .then(() => run('bundle'))
  .then(() => run('pages'))
);


task('publish', 'Build and publish the website', () => run('publish:gh'));

task('publish:gh', 'Build and publish the website to GitHub Pages', () => {
  const remote = {
    url: 'https://github.com/koistya/site.git', // TODO: Update deployment URL
    branch: 'gh-pages',
  };
  const { spawn } = require('child_process'); // eslint-disable-line global-require
  const opts = { cwd: path.resolve(__dirname, './build'), stdio: ['ignore', 'inherit', 'inherit'] };
  const git = (...args) => new Promise((resolve, reject) => {
    spawn('git', args, opts).on('close', code => {
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


task('publish:s3', 'Build and publish the website to Amazon S3', () => {
  const s3 = require('s3'); // eslint-disable-line global-require
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


task('start', 'Build website and launch it in a browser for testing (default)', () =>
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
