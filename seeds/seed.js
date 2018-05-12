/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const config = require('../knexfile');

module.exports.seed = async db => {
  for (const table of config.tables.slice().reverse()) {
    console.log(`Remove data from the ${table} table.`);
    await db.table(table).del();
  }

  for (const table of config.tables) {
    console.log(`Seeding data into the ${table} table.`);
    const data = require(`./${table}.json`);
    if (table === 'user_identities') {
      data.forEach(x => {
        x.profile = JSON.stringify(x.profile);
        x.credentials = JSON.stringify(x.credentials);
      });
    }
    await db.table(table).insert(data);
  }
};
