/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

const fs = require('fs');
const path = require('path');

let file, text, search;

//
// Inject CSS Modules into webpack.config.dev.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js');
text = fs.readFileSync(file, 'utf8');
search = /importLoaders: 1,\n\s{12}}/;

if (text.match(search)) {
  text = text.replace(search, `importLoaders: 1,
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            }`);
  fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[name]-[local]-[hash:base64:5]') === -1) {
  throw new Error(`Failed to inject CSS Modules into ${file}`);
}

//
// Inject CSS Modules into webpack.config.prod.js
// -----------------------------------------------------------------------------
file = path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js');
text = fs.readFileSync(file, 'utf8');
search = /importLoaders: 1,\n\s{20}minimize: true,/;

if (text.match(search)) {
  text = text.replace(search, `importLoaders: 1,
                    modules: true,
                    localIdentName: '[hash:base64:5]',
                    minimize: true,`);
  fs.writeFileSync(file, text, 'utf8');
} else if (!text.indexOf('[hash:base64:5]') === -1) {
  throw new Error(`Failed to inject CSS Modules into ${file}`);
}
