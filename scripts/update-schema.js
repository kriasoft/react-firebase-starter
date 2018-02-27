/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

'use script';

process.env.NODE_ENV = 'test';

require('@babel/register')({
  babelrc: false,
  presets: [require.resolve('babel-preset-react-app')],
});

const fs = require('fs');
const path = require('path');
const graphql = require('graphql');
const schema = require('../src/graphql/schema').default;

fs.writeFileSync(
  path.resolve(__dirname, '../src/schema.graphql'),
  graphql.printSchema(schema, { commentDescriptions: true }),
  'utf8',
);
