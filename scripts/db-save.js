/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const fs = require('fs');
const path = require('path');
const knex = require('knex');
const prettier = require('prettier');
const config = require('../knexfile');

const db = knex(config);

(async () => {
  for (const table of config.tables) {
    let rows;

    try {
      rows = await db
        .table(table)
        .orderBy('created_at')
        .select();
    } catch (err) {
      if (err.routine === 'errorMissingColumn') {
        rows = await db.table(table).select();
      } else {
        throw err;
      }
    }

    fs.writeFileSync(
      path.join(__dirname, `../seeds/${table}.json`),
      prettier.format(JSON.stringify(rows), { parser: 'json' }),
      'utf8',
    );
  }
  db.destroy();
})().catch(console.error);
