/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import serialize from 'serialize-javascript';
import createHistory from 'history/createMemoryHistory';
import { fetchQuery } from 'relay-runtime';
import { Router } from 'express';

import templates from './templates';
import routes from './router';
import createRelay from './createRelay.node';
import assets from './assets.json';

const router = new Router();

router.get('*', async (request, response, next) => {
  try {
    const { path: pathname } = request;
    const history = createHistory({ initialEntries: [pathname] });
    const relay = createRelay(request);

    // Find a matching route for the URL path
    const route = await routes.resolve({
      pathname,
      history,
      fetchQuery(query, variables, cacheConfig) {
        return fetchQuery(relay, query, variables, { ...cacheConfig, request });
      },
      renderRoute(data) {
        // TODO: ReactDOMServer.renderToString(...);
        return data;
      },
    });

    if (route.redirect) {
      response.redirect(route.redirect, route.status || 301);
    } else {
      if (process.env.NODE_ENV === 'production') {
        response.set('Cache-Control', 'public, max-age=600, s-maxage=900');
      }
      response.send(
        templates.ok({
          title: route.title,
          description: route.description,
          assets: (route.chunks || []).reduce(
            (chunks, name) => [...chunks, ...assets[name]],
            assets.main,
          ),
          data: serialize(request.data, { isJSON: true }),
        }),
      );
    }
  } catch (err) {
    next(err);
  }
});

export default router;
