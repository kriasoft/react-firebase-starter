/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import webpack from 'webpack';
import config from './config';

export default ({ pages }) => new Promise((resolve, reject) => {
  console.log('bundle');
  const bundler = webpack(config);
  const bundle = (err, stats) => {
    if (err) {
      reject(err);
    } else {
      console.log(stats.toString(config[0].stats));
      resolve();
    }
  };
  bundler.run(bundle);
});
