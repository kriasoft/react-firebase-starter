/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import express from 'express';
import createHistory from 'history/createMemoryHistory';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Html from './components/Html';
import routes from './routes';
import assets from './assets.json';

const app = express();

app.get('*', async (req, res, next) => {
  try {
    const history = createHistory({ initialEntries: [req.path] });

    const render = props =>
      new Promise((resolve, reject) => {
        try {
          const html = ReactDOMServer.renderToStaticMarkup(
            <Html
              title={props.route.title}
              assets={(props.route.chunks || []).reduce(
                (acc, x) => [...acc, ...assets[x]],
                assets.main,
              )}
            />,
          );
          res.send(`<!DOCTYPE html>${html}`);
          resolve(props);
        } catch (err) {
          reject(err);
        }
      });

    await routes.resolve({
      pathname: req.path,
      location: history.location,
      user: null, // TODO: Pass the current user object
      render,
    });
  } catch (err) {
    next(err);
  }
});

export default app;
