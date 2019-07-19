/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';

export default [
  {
    path: '/terms',
    query: graphql`
      query legalTermsQuery {
        ...Layout_data
      }
    `,
    components: () => [import(/* webpackChunkName: 'terms' */ './Terms')],
    render: ([Terms], data, { config }) => ({
      title: `Terms of Use • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <Terms data={data} />
        </Layout>
      ),
      chunks: ['terms'],
    }),
  },
  {
    path: '/privacy',
    query: graphql`
      query legalPrivacyQuery {
        ...Layout_data
      }
    `,
    components: () => [import(/* webpackChunkName: 'privacy' */ './Privacy')],
    render: ([Privacy], data, { config }) => ({
      title: `Privacy Policy • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <Privacy data={data} />
        </Layout>
      ),
      chunks: ['privacy'],
    }),
  },
];
