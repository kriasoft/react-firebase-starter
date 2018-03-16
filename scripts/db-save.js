/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

'use script';

const fs = require('fs');
const path = require('path');
const knex = require('knex');
const prettier = require('prettier');
const config = require('../knexfile');

const db = knex(config);

(async () => {
  for (const table of config.tables) {
    const rows = await db.table(table).select();
    fs.writeFileSync(
      path.join(__dirname, `../seeds/${table}.json`),
      prettier.format(JSON.stringify(rows), { parser: 'json' }),
      'utf8',
    );
  }
  db.destroy();
})().catch(console.error);
