/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import UniversalRouter from 'universal-router/main.js';

// The list of all application routes where each route contains a URL path string (pattern),
// the list of components to load asynchroneously (chunks), data requirements (GraphQL query),
// and a render() function which shapes the result to be passed into the top-level (App) component.
// For more information visit https://github.com/kriasoft/universal-router
const routes = [
  {
    path: '',
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ({ user, components: [Home] }) => ({
      title: 'React Starter Kit for Firebase and GraphQL',
      body: <Home user={user} />,
    }),
  },
  {
    path: '/about',
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: ({ user, components: [About] }) => ({
      title: 'About Us • React Firebase Starter',
      body: <About user={user} />,
    }),
  },
  {
    path: '/privacy',
    components: () => [import(/* webpackChunkName: 'privacy' */ './Privacy')],
    render: ({ user, components: [Privacy] }) => ({
      title: 'Privacy Policy • React Firebase Starter',
      body: <Privacy user={user} />,
    }),
  },
];

function resolveRoute(ctx) {
  const { route } = ctx;

  if (!route.render) {
    return ctx.next();
  }

  return Promise.all(route.components()).then(components =>
    ctx.render({
      user: ctx.user,
      location: ctx.location,
      route: route.render({
        user: ctx.user,
        location: ctx.ocation,
        components: components.map(x => x.default),
      }),
    }),
  );
}

export default new UniversalRouter(routes, { resolveRoute });
