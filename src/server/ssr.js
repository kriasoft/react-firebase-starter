/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import serialize from 'serialize-javascript';
import createHistory from 'history/createMemoryHistory';
import { config } from 'firebase-functions';
import { fetchQuery } from 'relay-runtime';
import { Router } from 'express';

import passport from './passport';
import templates from '../templates';
import routes from '../router';
import createRelay from './createRelay';
import assets from './assets.json';

const router = new Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('*', async (req, res, next) => {
  try {
    const { path: pathname } = req;
    const history = createHistory({ initialEntries: [pathname] });
    const relay = createRelay(req);

    // Find a matching route for the URL path
    const route = await routes.resolve({
      pathname,
      history,
      fetchQuery: fetchQuery.bind(undefined, relay),
    });

    if (route.redirect) {
      res.redirect(route.redirect, route.status || 301);
    } else {
      if (process.env.GCP_PROJECT === 'react-firebase-graphql') {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=900');
      }
      res.send(
        templates.ok({
          title: route.title,
          description: route.description,
          assets: (route.chunks || []).reduce(
            (chunks, name) => [...chunks, ...assets[name]],
            assets.main,
          ),
          data: serialize(req.data, { isJSON: true }),
          config: JSON.stringify({
            firebase: {
              projectId:
                process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT,
              authDomain:
                process.env.FIREBASE_AUTH_DOMAIN || config().auth.domain,
              apiKey:
                process.env.FIREBASE_API_BROWSER_KEY || config().api.browserkey,
            },
          }),
        }),
      );
    }
  } catch (err) {
    next(err);
  }
});

export default router;
