/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import path from 'path';
import minimist from 'minimist';
import webpack from 'webpack';
import gutil from 'gulp-util';
import autoprefixer from 'autoprefixer-core';
import merge from 'lodash/object/merge';

const argv = minimist(process.argv.slice(2));
const DEBUG = !argv.release;
const VERBOSE = !!argv.verbose;
const REACT_HOT_LOADER = DEBUG ? 'react-hot!babel' : 'babel';
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

// Base configuration
const config = {
  entry: DEBUG ? [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ] : [],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: './',
    sourcePrefix: '  '
  },
  cache: false,
  debug: DEBUG,
  stats: {
    colors: gutil.colors.supportsColor,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: VERBOSE,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      '__DEV__': DEBUG
    }),
    DEBUG && new webpack.HotModuleReplacementPlugin(),
    DEBUG && new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: REACT_HOT_LOADER
    }, {
      test: /routes\.jsx?$/,
      loader: './routes-loader.js'
    }]
  },
  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
};

// Configuration for the client-side bundle
const appConfig = merge({}, config, {
  entry: config.entry.concat([
    './scripts/app.js'
  ]),
  output: {
    filename: 'app.js'
  }
});

// Configuration for server-side pre-rendering bundle
const pagesConfig = merge({}, config, {
  entry: './scripts/pages.js',
  output: {
    filename: 'pages.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
});

export default [appConfig, pagesConfig];
