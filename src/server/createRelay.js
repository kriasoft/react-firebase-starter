/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { graphql } from 'graphql';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import type { Request } from 'express';

import schema from './schema';
import Context from './Context';

export default function createRelay(req: Request) {
  function fetchQuery(operation, variables, cacheConfig) {
    return graphql({
      schema,
      source: operation.text,
      contextValue: new Context(req),
      variableValues: variables,
      operationName: operation.name,
    }).then(payload => {
      // Passes the raw payload up to the caller (see src/router.js).
      // This is needed in order to hydrate/de-hydrate that
      // data on the client during the initial page load.
      cacheConfig.payload = payload;

      // Some types of errors need to abort the whole request.
      const error = (payload.errors || []).find(x =>
        [401, 403].includes(x.originalError && x.originalError.code),
      );

      if (error) {
        throw error.originalError;
      }

      return payload;
    });
  }

  const recordSource = new RecordSource();
  const store = new Store(recordSource);
  const network = Network.create(fetchQuery);

  return new Environment({ store, network });
}
