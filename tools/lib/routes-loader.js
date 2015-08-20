/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from 'glob';
import { join } from 'path';

export default function (source) {
  this.cacheable();
  const target = this.target;
  const callback = this.async();

  if (target === 'node') {
    source = source.replace('import \'babel/polyfill\';', '');
  }

  glob('**/*.{js,jsx}', { cwd: join(__dirname, '../../src/pages') }, function(err, files) {
    if (err) {
      return callback(err);
    }

    const lines = files.filter(file => !file.startsWith('js/')).map(file => {
      var path = '/' + file;
      var name = 'Component' + file.replace(/\//g, '').replace(/-/g,'').replace('.js', '');

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

      return `
        const ${name} = require('./pages/${file}');
        on('${path}',  () => <${name} />);`;
    });

    if (lines.length) {
      return callback(null, source.replace('/*-- Auto insert routes here --*/', lines.join('')));
    } else {
      return callback(new Error('Cannot find any routes.'));
    }
  });

};
