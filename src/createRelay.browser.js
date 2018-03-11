/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

export default function createRelay() {
  function fetchQuery(operation, variables) {
    if (typeof window.data !== 'undefined') {
      const data = window.data;
      delete window.data;
      return Promise.resolve(data);
    }

    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
      credentials: 'include',
    }).then(res => res.json());
  }

  const recordSource = new RecordSource();
  const store = new Store(recordSource);
  const network = Network.create(fetchQuery);

  return new Environment({ store, network });
}
