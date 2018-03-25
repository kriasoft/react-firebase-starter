/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import * as userQueries from './user/queries';
import * as userMutations from './user/mutations';
import * as storyQueries from './story/queries';
import * as storyMutations from './story/mutations';
import { nodeField, nodesField } from './Node';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,
      nodes: nodesField,
      ...userQueries,
      ...storyQueries,
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...userMutations,
      ...storyMutations,
    },
  }),
});
