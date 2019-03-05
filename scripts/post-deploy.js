/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const got = require('got');

// Load environment variables
require('../knexfile');

// The list of URLs to purge from CDN cache after deployment is complete
const urls = [
  '/',
  '/about',
  '/news',
  '/submit',
  '/account',
  '/privacy',
  '/terms',
];

const options = {
  baseUrl: process.env.APP_ORIGIN,
  method: 'PURGE',
};

Promise.all(urls.map(path => got(path, options))).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
