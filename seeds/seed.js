/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

'use script';

const config = require('../knexfile');

module.exports.seed = async db => {
  for (const table of config.tables.slice().reverse()) {
    console.log(`Remove data from the ${table} table.`);
    await db.table(table).del();
  }

  for (const table of config.tables) {
    console.log(`Seeding data into the ${table} table.`);
    const data = require(`./${table}.json`);
    await db.table(table).insert(data);
  }
};
