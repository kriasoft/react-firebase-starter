/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import fs from 'fs';
import path from 'path';
import cookie from 'cookie';
import expressGraphQL from 'express-graphql';
import { auth } from 'firebase-admin';
import { Router } from 'express';
import { printSchema } from 'graphql';

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

const sessionKey = '__session';
const sessionOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 30 /* 1 month */,
};

async function authentication(req, res, next) {
  try {
    const { __session: token } = req.headers.cookie
      ? cookie.parse(req.headers.cookie)
      : {};
    req.user = token ? await auth().verifyIdToken(token) : null;
    req.signIn = async token => {
      const user = await auth().verifyIdToken(token);
      if (user) {
        res.cookie(sessionKey, token, sessionOptions);
      }
      return (req.user = user);
    };
    req.signOut = () => {
      res.clearCookie(sessionKey, sessionOptions);
    };
    next();
  } catch (err) {
    next(err);
  }
}

router.use(
  '/graphql',
  authentication,
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
