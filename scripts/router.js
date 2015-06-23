/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import React from 'react';
import routes from './routes.js';

async function render(path, container) {
  let component;

  try {
    const handler = routes[path];

    if (handler) {
      component = React.createElement(await handler());
    } else {
      component = React.createElement(routes['/404']());
    }

    if (container) {
      React.render(component, container);
    } else {
      return React.renderToString(component);
    }
  } catch (error) {
    component = React.createElement(routes['/500'](), { path, error });
    if (container) {
      React.render(component, container);
    } else {
      return React.renderToString(component);
    }
  }
}

export default { routes, render };
