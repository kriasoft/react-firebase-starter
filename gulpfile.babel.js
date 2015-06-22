/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import run from 'run-sequence';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const $ = gulpLoadPlugins();

// Default Gulp task
gulp.task('default', ['serve']);

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

// Bundling and optimization
gulp.task('bundle', cb => {
  const config = require('./webpack.config.js');
  const bundler = webpack(config);
  const bundle = (err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }
    console.log(stats.toString(config[0].stats));
    cb();
  };
  bundler.run(bundle);
});

// Generate web pages from React.js components
gulp.task('pages', () =>
  require('./build/pages.js')()
    .pipe(gulp.dest('build'))
);

// Compile everything to the `/build` folder
gulp.task('build', cb => run('clean', 'bundle', 'pages', cb));

// Launch development server with "hot reload"
gulp.task('serve', cb => {
  global.watch = true;
  const config = require('./webpack.config.js');
  const bundler = webpack(config);
  const server = new WebpackDevServer(bundler, {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    filename: '../app.js',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: config[0].stats,
    historyApiFallback: true
  });
  server.listen(3000, 'localhost', () => {
    $.util.log('Server is running at ', $.util.colors.magenta('http://localhost:3000/'));
    cb();
  });
});
