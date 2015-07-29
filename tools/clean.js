/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import del from 'del';
import fs from './lib/fs';

export default () => new Promise((resolve, reject) => {
  console.log('clean');
  del(['build/*', '!build/.git'], { dot: true }, err => {
    if (err) {
      reject(err);
    } else {
      fs.makeDir('build').then(resolve, reject);
    }
  });
});
