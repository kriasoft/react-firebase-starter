/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const argv = require('miminist')(process.argv.slice(2));

if (argv.env === 'prod' || argv.env === 'production') {
  require('dotenv').config({ path: '.env.production.local' });
  require('dotenv').config({ path: '.env.production' });
}

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });
