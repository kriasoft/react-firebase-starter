/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

export default async () => {
  console.log('deploy');
  await require('./build')();
  console.log('TODO: deploy to GitHub pages');
};
