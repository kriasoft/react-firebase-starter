/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import path from 'path';
import minimist from 'minimist';
import webpack from 'webpack';
import merge from 'lodash/object/merge';

const argv = minimist(process.argv.slice(2));
const DEBUG = !argv.release;
const VERBOSE = !!argv.verbose;
const WATCH = global.watch;
const SCRIPT_LOADERS = WATCH ? ['react-hot', 'babel'] : ['babel'];
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
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    sourcePrefix: '  '
  },
  cache: false,
  debug: DEBUG,
  stats: {
    colors: true,
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
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader/useable!' +
      'css-loader' + (DEBUG ? '' : '/minimize') + '!postcss-loader'
    }, {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, '../src')
      ],
      loaders: SCRIPT_LOADERS
    }, {
      test: /[\\\/]app\.js$/,
      loader: path.join(__dirname, './lib/routes-loader.js')
    }, {
      test: /\.gif/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  },
  postcss: [
    require('cssnext')({ browsers: AUTOPREFIXER_BROWSERS }),
    require('postcss-nested')()
  ]
};

// Configuration for the client-side bundle
const appConfig = merge({}, config, {
  entry: (WATCH ? [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ] : []).concat([
      './src/js/app.js'
    ]),
  output: {
    filename: 'app.js'
  },
  plugins: [
    ...config.plugins,
    ...(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: VERBOSE}}),
      new webpack.optimize.AggressiveMergingPlugin()
    ]),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [])
  ]
});

// Configuration for server-side pre-rendering bundle
const pagesConfig = merge({}, config, {
  entry: './src/js/app.js',
  output: {
    filename: 'app.node.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z][a-z\.\-\/0-9]*$/i,
  plugins: config.plugins.concat([
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ]),
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
