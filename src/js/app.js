/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import 'babel/polyfill';
import React from 'react';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import Layout from './Layout';

const routes = {}; // Auto-generated on build. See tools/lib/routes-loader.js

const route = async (path, callback) => {
  const handler = routes[path] || routes['/404'];
  const component = await handler();
  await callback(<Layout>{React.createElement(component)}</Layout>);
};

if (canUseDOM) {
  const container = document.getElementById('app');
  route('/', async (component) => React.render(component, container));
}

export default { route, routes };
