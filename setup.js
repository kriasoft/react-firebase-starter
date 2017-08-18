/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

const fs = require('fs');
const path = require('path');
const https = require('https');

//
// Create back up file if it is not already present
// -----------------------------------------------------------------------------
async function backupIfNotPresent(filePath) {
  const origFilePath = path.resolve(filePath);
  const backFilePath = path.resolve(filePath + '.bak');
  if (!fs.existsSync(backFilePath)) {
    const stream = fs.createReadStream(origFilePath);
    stream.pipe(fs.createWriteStream(backFilePath));
    return new Promise(function(resolve, reject) {
      stream.on('end', () => resolve(true));
      stream.on('error', reject); // or something like that
    });
  }
  return new Promise(() => true);
}

//
// Inject replacement text over text macthing searchRegex in specified file
// -----------------------------------------------------------------------------
async function inject(filePath, searchRegex, replaceText) {
  await backupIfNotPresent(filePath);
  const file = path.resolve(filePath);
  const origText = fs.readFileSync(file, 'utf8');
  if (origText.indexOf(replaceText) === -1) {
    if (origText.match(searchRegex)) {
      const updatedText = origText.replace(searchRegex, replaceText);
      fs.writeFileSync(file, updatedText, 'utf8');
    } else {
      throw new Error(
        `Failed to inject ${replaceText}
          for ${searchRegex.toString()}
          into ${filePath}`,
      );
    }
  }
}

//
// Inject CSS Modules into webpack.config.dev.js
// -----------------------------------------------------------------------------
inject(
  './node_modules/react-scripts/config/webpack.config.dev.js',
  /importLoaders: 1,\n\s{16}}/,
  `importLoaders: 1,
        modules: true,
        localIdentName: '[name]-[local]-[hash:base64:5]',
      }`,
);

//
// Inject CSS Modules into webpack.config.prod.js
// -----------------------------------------------------------------------------
inject(
  './node_modules/react-scripts/config/webpack.config.prod.js',
  /importLoaders: 1,\n\s{24}minimize: true,/,
  `importLoaders: 1,
                    modules: true,
                    localIdentName: '[hash:base64:5]',
                    minimize: true,`,
);

//
// Inject "babel-plugin-relay"
// -----------------------------------------------------------------------------
inject(
  './node_modules/babel-preset-react-app/index.js',
  /const plugins = \[/,
  "const plugins = [\n  require.resolve('babel-plugin-relay'),",
);

//
// Download the GraphQL schema
// -----------------------------------------------------------------------------
if (process.argv.includes('--download-schema')) {
  const file = fs.createWriteStream('./src/schema.graphql');
  https.get('https://graphql-demo.kriasoft.com/schema', resp => {
    if (resp.statusCode === 200) {
      resp.pipe(file);
    } else {
      throw new Error('Failed to download the schema.');
    }
  });
}
