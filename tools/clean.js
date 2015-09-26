/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import del from 'del';
import task from './lib/task';
import fs from './lib/fs';

export default task(async function clean() {
  await del(['build/*', '!build/.git'], { dot: true });
  await fs.mkdir('build');
});
