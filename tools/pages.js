/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from 'glob';
import { join } from 'path';

export default () => new Promise((resolve, reject) => {
  console.log('pages');
  glob('**/*.js', { cwd: join(__dirname, '../src') }, (err, files) => {
    if (err) {
      reject(err);
    } else {
      const result = files.filter(file => !file.startsWith('js/')).map(file => {
        let path = '/' + file.substr(0, file.lastIndexOf('.'));
        if (path === '/index') {
          path = '/';
        } else if (path.endsWith('/index')) {
          path = path.substr(0, path.lastIndexOf('/index'));
        }
        return { path, file };
      });
      resolve(result);
    }
  });
});
