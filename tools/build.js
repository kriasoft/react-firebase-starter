/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

(async () => {
  await require('./clean')();
  const pages = await require('./pages')();
  await require('./bundle')({ pages });
  await require('./render')({ pages });
})().then(() => console.log('done'), err => console.log(err.stack));
