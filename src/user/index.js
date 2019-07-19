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
    path: '/login',
    components: () => [import(/* webpackChunkName: 'login' */ './Login')],
    render: ([Login], _, { config }) => ({
      title: `Sign In to ${config.app.name}`,
      component: <Login />,
      chunks: ['login'],
    }),
  },
  {
    path: '/@:username',
    components: () => [
      import(/* webpackChunkName: 'user-profile' */ './UserProfile'),
    ],
    query: graphql`
      query userProfileQuery($username: String!) {
        ...Layout_data
        user(username: $username) {
          displayName
          ...UserProfile
        }
      }
    `,
    render: ([UserProfile], data, { config }) => ({
      title: `${data.user.displayName} • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <UserProfile data={data.user} />
        </Layout>
      ),
      chunks: ['user-profile'],
    }),
  },
  {
    path: '/account',
    components: () => [import(/* webpackChunkName: 'account' */ './Account')],
    query: graphql`
      query userQuery {
        ...Layout_data
        ...Account
      }
    `,
    render: ([Account], data, { config }) => ({
      title: `My Account • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <Account data={data} />
        </Layout>
      ),
      chunks: ['account'],
    }),
  },
];
