/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

if (process.argv.includes('--prod') || process.argv.includes('--production')) {
  require('dotenv').config({ path: '.env.production.local' });
  require('dotenv').config({ path: '.env.production' });
}

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });
