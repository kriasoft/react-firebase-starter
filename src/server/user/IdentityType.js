/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import idx from 'idx';
import { GraphQLObjectType, GraphQLEnumType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Identity',

  fields: {
    id: globalIdField(
      'Identity',
      self => `${self.provider}:${self.provider_id}`,
    ),

    provider: {
      type: new GraphQLEnumType({
        name: 'AuthenticationProvider',
        values: {
          GOOGLE: { value: 'google' },
          TWITTER: { value: 'twitter' },
          FACEBOOK: { value: 'facebook' },
        },
      }),
      resolve: self => self.provider,
    },

    providerId: {
      type: GraphQLString,
      resolve(self) {
        return self.provider_id;
      },
    },

    email: {
      type: GraphQLString,
      resolve(self, args, ctx) {
        if (!(ctx.user && (ctx.user.id === self.user_id || ctx.user.isAdmin))) {
          return null;
        }

        switch (self.provider) {
          case 'facebook':
            return idx(self, x => x.profile.email);
          default:
            return null;
        }
      },
    },

    displayName: {
      type: GraphQLString,
      resolve(self) {
        switch (self.provider) {
          case 'facebook':
            return idx(self, x => x.profile.name);
          default:
            return null;
        }
      },
    },

    photoURL: {
      type: GraphQLString,
      resolve(self) {
        switch (self.provider) {
          case 'google':
            return idx(self, x => x.profile.image.url);
          case 'facebook':
            return idx(self, x => x.profile.picture.data.url);
          default:
            return null;
        }
      },
    },

    profileURL: {
      type: GraphQLString,
      resolve(self) {
        switch (self.provider) {
          case 'google':
            return idx(self, x => x.profile.url);
          case 'facebook':
            return idx(self, x => x.profile.link);
          default:
            return null;
        }
      },
    },
  },
});
