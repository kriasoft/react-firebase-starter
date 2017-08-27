/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://graphql-demo.kriasoft.com/schema';

let file, text;

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
  https.get(API_URL, resp => {
    if (resp.statusCode === 200) {
      resp.pipe(file);
    } else {
      throw new Error('Failed to download the schema.');
    }
  });
}
