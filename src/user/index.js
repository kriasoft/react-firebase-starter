/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../components/Layout';

export default [
  {
    path: '/login',
    components: () => [import(/* webpackChunkName: 'login' */ './Login')],
    render: ([Login]) => ({
      title: 'Sign In • React Starter Kit for Firebase',
      component: <Login />,
      chunks: ['login'],
    }),
  },
  {
    path: '/account',
    components: () => [import(/* webpackChunkName: 'account' */ './Account')],
    query: graphql`
      query userQuery {
        ...Layout
        ...Account
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
