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
    path: '/news',
    components: () => [import(/* webpackChunkName: 'news' */ './News')],
    query: graphql`
      query newsQuery {
        ...Layout_data
        ...News_data
      }
    `,
    render: ([News], data, { config }) => ({
      title:
        `News • ${config.app.name}` +
        (() => {
          console.dir(data);
        })(),
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
        ...Layout_data
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
];
