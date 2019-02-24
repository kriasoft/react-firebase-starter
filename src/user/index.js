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
    path: '/login',
    components: () => [import(/* webpackChunkName: 'login' */ './Login')],
    render: ([Login]) => ({
      title: `Sign In • ${process.env.REACT_APP_NAME}`,
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
        ...Layout
        user(username: $username) {
          displayName
          ...UserProfile
        }
      }
    `,
    render: ([UserProfile], data) => ({
      title: `${data.user.displayName} • ${process.env.REACT_APP_NAME}`,
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
        ...Layout
        ...Account
      }
    `,
    render: ([Account], data) => ({
      title: `My Account • ${process.env.REACT_APP_NAME}`,
      component: (
        <Layout data={data}>
          <Account data={data} />
        </Layout>
      ),
      chunks: ['account'],
    }),
  },
];
