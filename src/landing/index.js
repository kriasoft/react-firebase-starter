/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';

export default [
  {
    path: '',
    query: graphql`
      query landingHomeQuery {
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ([Home], data, { config }) => ({
      title: config.appName,
      component: (
        <Layout data={data}>
          <Home data={data} />
        </Layout>
      ),
      chunks: ['home'],
    }),
  },
];
