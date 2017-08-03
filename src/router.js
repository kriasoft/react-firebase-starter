/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Router from 'universal-router';

const routes = [
  {
    path: '/',
    data: {
      articles: 'GET https://gist.githubusercontent.com/koistya/a32919e847531320675764e7308b796a/raw/articles.json',
    },
    components: () => [
      import(/* webpackChunkName: 'home' */ './Home'),
      import(/* webpackChunkName: 'home' */ './Home/Hero'),
    ],
    render: (_, Home, Hero) => ({
      title: 'Home page',
      hero: <Hero />,
      component: <Home />,
    }),
  },
  {
    path: '/error',
    components: () => [import(/* webpackChunkName: 'main' */ './ErrorPage')],
    render: (_, ErrorPage) => ({
      title: 'Error',
      component: <ErrorPage />,
    }),
  },
  {
    path: '/getting-started',
    components: () => [import(/* webpackChunkName: 'start' */ './GettingStarted')],
    render: (_, GettingStarted) => ({
      title: 'Getting Started',
      component: <GettingStarted />,
    })
  },
  {
    path: '/about',
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: (_, About) => ({
      title: 'About Us',
      component: <About />,
    }),
  },
  {
    path: '/tasks/:status(pending|completed)?',
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: (_, Home) => ({
      title: 'Untitled',
      component: <Home />,
    }),
  },
];

function resolveRoute({ route, next }, params) {
  if (!route.render) return next();

  const componentsPromise = route.components
    ? Promise.all(route.components().map(promise => promise.then(x => x.default)))
    : Promise.resolve([]);

  return componentsPromise.then(components => route.render({ data: null, params }, ...components));
}

export default new Router(routes, { resolveRoute });
