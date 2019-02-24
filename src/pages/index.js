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
      query pagesHomeQuery {
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ([Home], data) => ({
      title: process.env.APP_NAME,
      component: (
        <Layout data={data}>
          <Home data={data} />
        </Layout>
      ),
      chunks: ['home'],
    }),
  },
  {
    path: '/about',
    query: graphql`
      query pagesAboutQuery {
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: ([About], data) => ({
      title: `About Us • ${process.env.APP_NAME}`,
      component: (
        <Layout data={data}>
          <About data={data} />
        </Layout>
      ),
      chunks: ['about'],
    }),
  },
];
