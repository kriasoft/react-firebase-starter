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
    path: '/terms',
    query: graphql`
      query legalTermsQuery {
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'terms' */ './Terms')],
    render: ([Terms], data) => ({
      title: `Terms of Use • ${process.env.APP_NAME}`,
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
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'privacy' */ './Privacy')],
    render: ([Privacy], data) => ({
      title: `Privacy Policy • ${process.env.APP_NAME}`,
      component: (
        <Layout data={data}>
          <Privacy data={data} />
        </Layout>
      ),
      chunks: ['privacy'],
    }),
  },
];
