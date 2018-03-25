/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

const AccountProviderType = new GraphQLEnumType({
  name: 'AccountProvider',
  values: {
    FACEBOOK: { value: 'facebook.com' },
  },
});

export default new GraphQLObjectType({
  name: 'Account',

  fields: {
    id: globalIdField('Account', x => `${x.providerId}:${x.uid}`),

    provider: {
      type: AccountProviderType,
      resolve: x => x.providerId,
    },

    uid: {
      type: new GraphQLNonNull(GraphQLString),
    },

    email: {
      type: GraphQLString,
    },

    displayName: {
      type: GraphQLString,
    },

    photoURL: {
      type: GraphQLString,
    },
  },
});
