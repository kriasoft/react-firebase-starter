/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import UniversalRouter from 'universal-router';
import { fetchQuery } from 'relay-runtime';

import landing from './landing';
import legal from './legal';
import misc from './misc';
import user from './user';
import news from './news';

const routes = [
  ...landing,
  ...legal,
  ...misc,
  ...user,
  ...news,
  {
    path: '/admin',
    children: () => import(/* webpackChunkName: 'admin' */ './admin'),
  },
];

function resolveRoute(ctx) {
  const { route, params, relay } = ctx;

  // Allow to load routes on demand
  if (typeof route.children === 'function') {
    return route.children().then(x => {
      route.children = x.default;
      return undefined;
    });
  }

  // Skip routes without render() function
  if (!route.render) {
    return undefined;
  }

  // Start fetching data from GraphQL API
  const cacheConfig = { payload: null };
  const variables = route.variables ? route.variables(params, ctx) : params;
  const dataPromise =
    route.query && fetchQuery(relay, route.query, variables, cacheConfig);

  // Start downloading missing JavaScript chunks
  const componentsPromise = route.components
    ? route.components().map(x => x.then(x => x.default))
    : [];

  return Promise.all([...componentsPromise, dataPromise]).then(components => {
    // GraphQL API response
    const data = components.pop();
    const { payload } = cacheConfig;

    // If API response contains an authentication error,
    // redirect the user to a login page
    const error = ((payload && payload.errors) || [])
      .map(x => x.originalError || x)
      .find(x => [401, 403].includes(x.code));

    if (error) {
      const errorMsg = encodeURIComponent(error.message);
      const returnTo = encodeURIComponent(ctx.pathname);
      return {
        redirect: `/login?error=${errorMsg}&return=${returnTo}`,
      };
    }

    const renderContext = { ...ctx, variables };
    const result = route.render(components, data, renderContext);
    return result
      ? {
          ...result,
          query: route.query,
          variables,
          data,
          payload,
          render: props =>
            route.render(components, props, renderContext).component,
        }
      : undefined;
  });
}

function errorHandler(error) {
  return {
    title: error.code === '404' ? 'Page not found' : 'System Error',
    status: error.code || 500,
    error,
  };
}

export default new UniversalRouter(routes, {
  resolveRoute,
  errorHandler,
});
