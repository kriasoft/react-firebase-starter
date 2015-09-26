/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import webpack from 'webpack';
import task from './lib/task';
import config from './config';

export default task(function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(config);
    const run = (err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(config[0].stats));
        resolve();
      }
    };
    bundler.run(run);
  });
});
