/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import * as queries from './queries';
import * as mutations from './mutations';
import { nodeField, nodesField } from './node';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,
      nodes: nodesField,
      ...queries,
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations,
  }),
});
