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

import passport from './passport';
import templates from './templates';
import routes from '../router';
import createRelay from './createRelay';
import stats from './stats.json'; // eslint-disable-line

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
      res.redirect(route.status || 302, route.redirect);
    } else {
      if (process.env.NODE_ENV === 'production') {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=900');
      }
      res.send(
        templates.ok({
          title: route.title,
          description: route.description,
          assets: (route.chunks || []).reduce(
            (acc, name) => [
              ...acc,
              ...[].concat(stats.assetsByChunkName[name]),
            ],
            stats.entrypoints.main.assets,
          ),
          data: serialize(req.data, { isJSON: true }),
          config: JSON.stringify({
            firebase: {
              projectId: process.env.GCP_PROJECT,
              authDomain: process.env.FIREBASE_AUTH_DOMAIN,
              apiKey: process.env.GCP_BROWSER_KEY,
            },
            gaTrackingId: process.env.GA_TRACKING_ID,
          }),
          env: process.env,
        }),
      );
    }
  } catch (err) {
    next(err);
  }
});

export default router;
