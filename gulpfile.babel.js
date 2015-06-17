/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import run from 'run-sequence';
import minimist from 'minimist';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

const $ = gulpLoadPlugins();
const argv = minimist(process.argv.slice(2));
const verbose = !!argv.verbose;
const bundler = webpack(webpackConfig);

// Default Gulp task
gulp.task('default', ['serve']);

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

// Bundling and optimization
gulp.task('bundle', cb => {
  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }
    console.log(stats.toString(webpackConfig[0].stats));
    cb();
  }

  bundler.run(bundle);
});

// React.js-based web pages
gulp.task('pages', () =>
  require('./build/pages.js')()
    .pipe(gulp.dest('build'))
);

gulp.task('build', cb => run('clean', 'bundle', 'pages', cb));

gulp.task('serve', cb => {
  global.hot = true;
  run('build', () => {
    console.log('outputPath:', bundler.outputPath);
    const server = new WebpackDevServer(bundler, {
      contentBase: './build',
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      filename: '../app.js',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      publicPath: 'http://localhost:3000/',
      stats: { colors: true },
      historyApiFallback: true
    });

    server.listen(3000, 'localhost', () => {
      $.util.log('Server is running at ', $.util.colors.magenta('http://localhost:3000/'));
      cb();
    });
  });
});
