/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import task from './lib/task';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';
import render from './render';

export default task(async function build() {
  await clean();
  await copy();
  await bundle();
  await render();
});
