/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

const fs = require('fs');
const path = require('path');
const https = require('https');

let file, text, search;

//
// Inject CSS Modules into webpack.config.dev.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'); // prettier-ignore
text = fs.readFileSync(file, 'utf8');
search = /importLoaders: 1,\n\s{16}}/;

if (text.match(search)) {
  text = text.replace(
    search,
    `importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]-[local]-[hash:base64:5]',
                }`); // prettier-ignore
  fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[name]-[local]-[hash:base64:5]') === -1) {
  throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject CSS Modules into webpack.config.prod.js
// -----------------------------------------------------------------------------
file = path.resolve(
  './node_modules/react-scripts/config/webpack.config.prod.js',
);
text = fs.readFileSync(file, 'utf8');
search = /importLoaders: 1,\n\s{24}minimize: true,/;

if (text.match(search)) {
  text = text.replace(
    search,
    `importLoaders: 1,
                        modules: true,
                        localIdentName: '[hash:base64:5]',
                        minimize: true,`); // prettier-ignore
  fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[hash:base64:5]') === -1) {
  throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject "babel-plugin-relay"
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/babel-preset-react-app/index.js');
text = fs.readFileSync(file, 'utf8');

if (!text.includes('babel-plugin-relay')) {
  if (text.includes('const plugins = [')) {
    text = text.replace(
      'const plugins = [',
      "const plugins = [\n  require.resolve('babel-plugin-relay'),"); // prettier-ignore
    fs.writeFileSync(file, text, 'utf8');
  } else {
    throw new Error(`Failed to inject babel-plugin-relay in ${file}.`);
  }
}

//
// Download the GraphQL schema
// -----------------------------------------------------------------------------
if (process.argv.includes('--download-schema')) {
  file = fs.createWriteStream('./src/schema.graphql');
  https.get('https://graphql-demo.kriasoft.com/schema', resp => {
    if (resp.statusCode === 200) {
      resp.pipe(file);
    } else {
      throw new Error('Failed to download the schema.');
    }
  });
}
