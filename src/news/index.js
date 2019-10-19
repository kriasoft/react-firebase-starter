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
      title: `News • ${config.app.name}`,
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
          ...Story_story
          title
          slug
        }
      }
    `,
    render: ([Story], data, ctx) => {
      if (data.story && data.story.slug !== ctx.params.slug) {
        return { status: 301, redirect: `/news/${data.story.slug}` };
      } else if (data.story) {
        return {
          title: data.story.title,
          component: (
            <Layout data={data}>
              <Story story={data.story} />
            </Layout>
          ),
          chunks: ['story'],
        };
      }
    },
  },
];
