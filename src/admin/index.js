/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { graphql } from 'relay-runtime';
import AdminLayout from './AdminLayout';
import AdminUserList from './AdminUserList';
import AdminStoryList from './AdminStoryList';

export default [
  {
    path: '/users',
    query: graphql`
      query adminUserListQuery {
        ...AdminLayout_data
        ...AdminUserList_data
      }
    `,
    render: (_, { data, users }) => ({
      title: 'Manage Users',
      component: (
        <AdminLayout data={data}>
          <AdminUserList data={data} />
        </AdminLayout>
      ),
      chunks: ['admin'],
    }),
  },
  {
    path: '/stories',
    query: graphql`
      query adminStoryListQuery {
        ...AdminLayout_data
        ...AdminStoryList_data
      }
    `,
    render: (_, { data }) => ({
      title: 'Manage Stories',
      component: (
        <AdminLayout data={data}>
          <AdminStoryList data={data} />
        </AdminLayout>
      ),
      chunks: ['admin'],
    }),
  },
];
