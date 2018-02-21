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
    path: '/news',
    components: () => [import(/* webpackChunkName: 'news' */ './News')],
    query: graphql`
      query newsQuery {
        ...Layout
        ...News
      }
    `,
    render: ([News], data) => ({
      title: 'News • React Starter Kit for Firebase',
      component: (
        <Layout data={data}>
          <News data={data} />
        </Layout>
      ),
      chunks: ['news'],
    }),
  },
  {
    path: '/news/:slug',
    components: () => [import(/* webpackChunkName: 'story' */ './Story')],
    query: graphql`
      query newsStoryQuery($slug: String!) {
        ...Layout
        story(slug: $slug) {
          title
          ...Story
        }
      }
    `,
    render: ([Story], data) => {
      return data.story
        ? {
            title: data.story.title,
            component: (
              <Layout data={data}>
                <Story data={data.story} />
              </Layout>
            ),
            chunks: ['story'],
          }
        : null;
    },
  },
  {
    path: '/submit',
    query: graphql`
      query newsSubmitQuery {
        ...Layout
        ...Submit
      }
    `,
    components: () => [import(/* webpackChunkName: 'submit' */ './Submit')],
    render: ([Submit], data) => ({
      title: 'Submit a Story • React Starter Kit for Firebase',
      component: (
        <Layout data={data}>
          <Submit data={data} />
        </Layout>
      ),
      chunks: ['submit'],
    }),
  },
];
