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
  name: 'UserIdentity',

  fields: {
    id: globalIdField(
      'UserIdentity',
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
          case 'facebook':
            return idx(self, x => x.profile.picture.data.url);
          default:
            return null;
        }
      },
    },
  },
});

// const foo = {
//   id: '10156178386657868',
//   link: 'https://www.facebook.com/app_scoped_user_id/10156178386657868/',
//   name: 'Konstantin Tarkus',
//   cover: {
//     id: '10151616217827868',
//     source:
//       'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/893952_10151616217827868_1951212155_o.jpg?_nc_cat=0&oh=390bbaf45813ea9dd72a160d1a8d3d6f&oe=5B452695',
//     offset_x: 0,
//     offset_y: 30,
//   },
//   email: 'koistya@gmail.com',
//   gender: 'male',
//   locale: 'en_US',
//   picture: {
//     data: {
//       url:
//         'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/11402673_10153535658532868_482204590508606533_n.jpg?_nc_cat=0&oh=027d2d8301ba62e02ee29d817c0e7b89&oe=5B2C173F',
//       width: 50,
//       height: 50,
//       is_silhouette: false,
//     },
//   },
//   timezone: 3,
//   verified: true,
//   age_range: { min: 21 },
//   last_name: 'Tarkus',
//   first_name: 'Konstantin',
//   updated_time: '2018-03-23T20:34:52+0000',
// };
