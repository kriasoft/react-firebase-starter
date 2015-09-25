/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import { join, dirname } from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../components/Html';
import fs from './lib/fs';

async function render(page, component) {
  const data = {
    body: ReactDOM.renderToString(component),
  };
  const file = join(__dirname, '../build', page.file.substr(0, page.file.lastIndexOf('.')) + '.html');
  const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
  await fs.mkdir(dirname(file));
  await fs.writeFile(file, html);
}

export default async ({ pages }) => {
  console.log('render');
  const { route } = require('../build/app.node');
  for (const page of pages) {
    await route(page.path, render.bind(undefined, page));
  }
};
