/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const repl = require('repl');
const knex = require('knex');
const config = require('../knexfile');

global.db = knex(config);

global.db
  .raw('select current_database(), version()')
  .then(({ rows: [x] }) => {
    console.log('Connected to', x.current_database);
    console.log(x.version);
    repl.start('#> ').on('exit', process.exit);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
