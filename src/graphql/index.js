/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import fs from 'fs';
import path from 'path';
import expressGraphQL from 'express-graphql';
import { Router } from 'express';
import { printSchema } from 'graphql';

import authenticate from '../authenticate';
import schema from './schema';
import Context from './Context';

const router = new Router();

if (process.env.NODE_ENV !== 'production') {
  fs.writeFileSync(
    path.join(process.cwd(), 'src/schema.graphql'),
    printSchema(schema, { commentDescriptions: true }),
    'utf8',
  );
}

router.use(
  '/graphql',
  authenticate,
  expressGraphQL(req => ({
    schema,
    context: new Context(req),
    graphiql: process.env.REACT_APP_ENV !== 'production',
    pretty: process.env.REACT_APP_ENV !== 'production',
    formatError: err => {
      console.error(err.originalError || err);
      return {
        message: err.message,
        code: err.originalError && err.originalError.code,
        state: err.originalError && err.originalError.state,
        locations: err.locations,
        path: err.path,
      };
    },
  })),
);

export default router;
