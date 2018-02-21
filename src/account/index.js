/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { graphql } from 'relay-runtime';

import Layout from '../components/Layout';

// The list of all application routes where each route contains a URL path string (pattern),
// the list of components to load asynchroneously (chunks), data requirements (GraphQL query),
// and a render() function which shapes the result to be passed into the top-level (App) component.
// For more information visit https://github.com/kriasoft/universal-router
export default [
  {
    path: '/account',
    components: () => [import(/* webpackChunkName: 'account' */ './Account')],
    query: graphql`
      query accountQuery {
        ...Layout
      }
    `,
    render: ([Account], data) => ({
      title: 'My Account • React Starter Kit for Firebase',
      component: (
        <Layout data={data}>
          <Account data={data} />
        </Layout>
      ),
      chunks: ['account'],
    }),
  },
];
