/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import loading from './utils/loading';

export default function createRelay() {
  function fetchQuery(operation, variables, cacheConfig = {}) {
    // Instead of making an actual HTTP request to the API, use
    // hydrated data available during the initial page load.
    if (window.data !== undefined) {
      cacheConfig.payload = window.data;
      delete window.data;
    }

    if (cacheConfig.payload) {
      return Promise.resolve(cacheConfig.payload);
    }

    loading.notifyStart();

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
    })
      .then(res => res.json())
      .then(payload => {
        // Passes the raw payload up to the caller (see src/router.js).
        // This is needed in order to optimize the initial rendering.
        cacheConfig.payload = payload;
        return payload;
      })
      .finally(() => {
        loading.notifyStop();
      });
  }

  const recordSource = new RecordSource();
  const store = new Store(recordSource);
  const network = Network.create(fetchQuery);

  return new Environment({ store, network });
}
