/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

'use strict'; // eslint-disable-line strict

var glob = require('glob');
var { join } = require('path');

module.exports = function() {
  this.cacheable();
  var callback = this.async();

  var target = this.target;
  var source = ['export default {'];

  glob('**/*.{js,jsx}', { cwd: join(__dirname, '../content') }, function(err, files) {
    if (err) {
      callback(err);
      return;
    }

    files.forEach(function(file) {
      var path = '/' + file;

      if (path === '/index.js' || path === '/index.jsx') {
        path = '/';
      } else if (path.endsWith('/index.js')) {
        path = path.substr(0, path.length - 9);
      } else if (path.endsWith('/index.jsx')) {
        path = path.substr(0, path.length - 10);
      } else if (path.endsWith('.js')) {
        path = path.substr(0, path.length - 3);
      } else if (path.endsWith('.jsx')) {
        path = path.substr(0, path.length - 4);
      }

      if (target === 'node' || path === '/404' || path === '/500') {
        source.push('  \'' + path + '\': () => require(\'../content/' + file + '\'),');
      } else {
        source.push(
          '  \'' + path + '\': async () => new Promise(resolve => { ' +
          'require.ensure([\'../content/' + file + '\'], require => resolve(require(\'../content/' + file + '\'))); }),');
      }
    });

    source.push('};');
    source = source.join('\n');

    callback(null, source);
  });

};
