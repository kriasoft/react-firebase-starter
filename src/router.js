/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import Router from 'universal-router';

const routes = [
  {
    path: '/',
    data: {
      articles: 'GET https://gist.githubusercontent.com/koistya/a32919e847531320675764e7308b796a/raw/articles.json',
    },
    load: () => import(/* webpackChunkName: 'home' */ './Home'),
  },
  {
    path: '/error',
    load: () => import(/* webpackChunkName: 'main' */ './ErrorPage'),
  },
  {
    path: '/getting-started',
    load: () => import(/* webpackChunkName: 'start' */ './GettingStarted'),
  },
  {
    path: '/about',
    load: () => import(/* webpackChunkName: 'about' */ './About'),
  },
  {
    path: '/tasks/:status(pending|completed)?',
    load: () => import(/* webpackChunkName: 'home' */ './Home'),
  },
];

export default new Router(routes, {
  resolveRoute({ route, next }, params) {
    return route.load ? route.load()
      .then(module => ({
        ...route,
        ...module.default(),
      })) : next();
  }
});
