/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Html from './components/Html';

const app = express();

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToStaticMarkup(<Html />);
  res.send(`<!DOCTYPE html>${html}`);
});

export default app;
