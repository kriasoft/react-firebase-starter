/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from './Layout';
import UserList from './UserList';
import StoryList from './StoryList';

export default [
  {
    path: '/users',
    query: graphql`
      query adminUserListQuery {
        ...LayoutAdmin
        ...UserListAdmin
      }
    `,
    render: (_, data) => ({
      title: 'Manage Users',
      component: (
        <Layout data={data}>
          <UserList data={data} />
        </Layout>
      ),
      chunks: ['admin'],
    }),
  },
  {
    path: '/stories',
    query: graphql`
      query adminStoryListQuery {
        ...LayoutAdmin
        ...StoryListAdmin
      }
    `,
    render: (_, data) => ({
      title: 'Manage Stories',
      component: (
        <Layout data={data}>
          <StoryList data={data} />
        </Layout>
      ),
      chunks: ['admin'],
    }),
  },
];
