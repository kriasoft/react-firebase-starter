/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

process.env.NODE_ENV = 'test';

require('@babel/register')({
  babelrc: false,
  presets: [require.resolve('react-app-tools/config/babel')],
});

const fs = require('fs');
const path = require('path');
const graphql = require('graphql');
const schema = require('../src/server/schema').default;
const db = require('../src/server/db').default;

fs.writeFileSync(
  path.resolve(__dirname, '../schema.graphql'),
  graphql.printSchema(schema, { commentDescriptions: true }),
  'utf8',
);

db.destroy();
