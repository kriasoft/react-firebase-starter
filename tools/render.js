/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import { join, dirname } from 'path';
import glob from 'glob';
import React from 'react';
import createTemplate from 'lodash/string/template';
import fs from './lib/fs';

const template = createTemplate(`<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title><%- title %></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
</head>
<body>
  <div id="app"><%= body %></div>
  <script src="/app.js"></script>
  <script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X','auto');ga('send','pageview');
  </script>
</body>
</html>`);

export default async ({ pages }) => {
  console.log('render');
  const { route } = require('../build/app.node');
  for (const page of pages) {
    await route(page.path, async (component) => {
      const data = {
        title: '',
        body: React.renderToString(component)
      };
      const file = join(__dirname, '../build', page.file.substr(0, page.file.lastIndexOf('.')) + '.html');
      const html = template(data);
      await fs.makeDir(dirname(file));
      await fs.writeFile(file, html);
    })
  }
};
