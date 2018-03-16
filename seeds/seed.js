/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

'use script';

const config = require('../knexfile');

module.exports.seed = async db => {
  for (const table of config.tables.slice().reverse()) {
    await db.table(table).del();
  }

  for (const table of config.tables) {
    const data = require(`./${table}.json`);
    await db.table(table).insert(data);
  }
};
