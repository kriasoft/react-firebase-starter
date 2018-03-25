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
  function fetchQuery(operation, variables) {
    return graphql({
      schema,
      source: operation.text,
      contextValue: new Context(req),
      variableValues: variables,
      operationName: operation.name,
    }).then(payload => {
      if (payload.errors) {
        throw new Error(payload.errors);
      }
      return (req.data = payload);
    });
  }

  const recordSource = new RecordSource();
  const store = new Store(recordSource);
  const network = Network.create(fetchQuery);

  return new Environment({ store, network });
}
