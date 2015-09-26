/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import task from './lib/task';

export default task(async function build() {
  await require('./clean')();
  await require('./copy')();
  await require('./bundle')();
  await require('./render')();
});
