/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import UniversalRouter from 'universal-router';

import pages from './pages';
import account from './account';
import news from './news';

const routes = [
  ...pages,
  ...account,
  ...news,
  {
    path: '/admin',
    children: () => import(/* webpackChunkName: 'admin' */ './admin'),
  },
];

function resolveRoute(ctx) {
  const { route, params, fetchQuery, renderRoute, next } = ctx;

  // Allow to load routes on demand
  if (typeof route.children === 'function') {
    return route.children().then(x => {
      route.children = x.default;
      return next();
    });
  }

  if (!route.render) {
    return next();
  }

  // Start fetching data from GraphQL API
  const dataPromise = route.query ? fetchQuery(route.query, params) : null;

  // Start downloading missing JavaScript chunks
  const componentsPromise = route.components
    ? route.components().map(x => x.then(x => x.default))
    : [];

  return Promise.all([...componentsPromise, dataPromise]).then(components => {
    const data = components.pop();
    return renderRoute({
      ...route.render(components, data, ctx),
      data,
    });
  });
}

function errorHandler(error) {
  return {
    title: error.code === '404' ? 'Page not found' : 'System Error',
    status: error.code || 404,
  };
}

export default new UniversalRouter(routes, {
  resolveRoute,
  errorHandler,
});
