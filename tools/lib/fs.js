/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import fs from 'fs';
import mkdirp from 'mkdirp';

const writeFile = (filename, contents) => new Promise((resolve, reject) => {
  fs.writeFile(filename, contents, 'utf8', err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const makeDir = name => new Promise((resolve, reject) => {
  mkdirp(name, err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

export default { writeFile, makeDir };
