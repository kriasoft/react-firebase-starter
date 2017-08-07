/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Router from 'universal-router';
import { graphql } from 'relay-runtime';

// The list of all application routes where each route contains a URL path string (pattern),
// the list of components to load asynchroneously (chunks), data requirements (GraphQL query),
// and a render() function which shapes the result to be passed into the top-level (App) component.
// For more information visit https://github.com/kriasoft/universal-router
const routes = [
  {
    path: '/',
    query: graphql`query routerHomeQuery { me { ...App_me } }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'home' */ './Home'),
      import(/* webpackChunkName: 'home' */ './Home/Hero'),
    ],
    render: ([Home, Hero]) => ({
      title: 'Home page',
      hero: <Hero />,
      body: <Home />,
    }),
  },
  {
    path: '/error',
    components: () => [import(/* webpackChunkName: 'main' */ './ErrorPage')],
    render: ([ErrorPage]) => ({
      title: 'Error',
      body: <ErrorPage />,
    }),
  },
  {
    path: '/getting-started',
    query: graphql`query routerGettingStartedQuery { me { ...App_me } }`, // prettier-ignore
    components: () => [
      import(/* webpackChunkName: 'start' */ './GettingStarted'),
    ],
    render: ([GettingStarted]) => ({
      title: 'Getting Started',
      body: <GettingStarted />,
    }),
  },
  {
    path: '/about',
    query: graphql`query routerAboutQuery { me { ...App_me } }`, // prettier-ignore
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: ([About]) => ({
      title: 'About Us',
      body: <About />,
    }),
  },
  {
    path: '/tasks/:status(pending|completed)?',
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ([Home]) => ({
      title: 'Untitled Page',
      body: <Home />,
    }),
  },
];

function resolveRoute({ route, fetch, next }, params) {
  // Skip routes that have no .render() method
  if (!route.render) return next();

  // Shape the result to be passed into the top-level React component (App)
  return {
    params,
    query: route.query,
    variables:
      typeof route.variables === 'function' ? route.variables(params) : params,
    components:
      typeof route.components === 'function'
        ? Promise.all(
            route.components().map(promise => promise.then(x => x.default)),
          ).then(components => (route.components = components))
        : route.components,
    render: route.render,
  };
}

export default new Router(routes, { resolveRoute });
