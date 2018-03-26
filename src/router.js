/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import UniversalRouter from 'universal-router';

import pages from './pages';
import user from './user';
import news from './news';
import ErrorPage from './pages/ErrorPage';

const routes = [
  ...pages,
  ...user,
  ...news,
  {
    path: '/admin',
    children: () => import(/* webpackChunkName: 'admin' */ './admin'),
  },
];

function resolveRoute(ctx) {
  const { route, params, fetchQuery, next } = ctx;

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
    return {
      ...route.render(components, data, ctx),
      data,
    };
  });
}

function errorHandler(error) {
  return {
    title: error.code === '404' ? 'Page not found' : 'System Error',
    status: error.code || 404,
    component: <ErrorPage error={error} />,
  };
}

export default new UniversalRouter(routes, {
  resolveRoute,
  errorHandler,
});
