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
    path: '/about',
    query: graphql`
      query miscAboutQuery {
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: ([About], data, { config }) => ({
      title: `About Us • ${config.appName}`,
      component: (
        <Layout data={data}>
          <About data={data} />
        </Layout>
      ),
      chunks: ['about'],
    }),
  },
];
