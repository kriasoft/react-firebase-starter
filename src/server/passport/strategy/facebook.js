/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import idx from 'idx';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import db from '../../db';
import * as utils from '../utils';

// https://github.com/jaredhanson/passport-facebook
// https://developers.facebook.com/docs/facebook-login/permissions/
export default new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/login/facebook/return',
    profileFields: [
      'id',
      'cover',
      'name',
      'displayName',
      'age_range',
      'link',
      'gender',
      'locale',
      'picture',
      'timezone',
      'updated_time',
      'verified',
      'email',
    ],
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    try {
      console.log(JSON.stringify(profile, false, '  '));

      const identityKeys = {
        'user_identities.provider': profile.provider,
        'user_identities.id': profile.id,
      };

      const credentials = { accessToken, refreshToken };
      const email = idx(profile, x => x.emails[0].value);
      const photo = idx(profile, x => x.photos[0].value);

      let user = await db
        .table('user_identities')
        .leftJoin('users', 'users.id', 'user_identities.user_id')
        .where(identityKeys)
        .select('users.*')
        .first();

      if (user) {
        await Promise.all([
          db
            .table('user_identities')
            .where(identityKeys)
            .update({
              credentials: JSON.stringify(credentials),
              profile: JSON.stringify(profile._json),
              updated_at: db.fn.now(),
            }),
          db
            .table('users')
            .where({ id: user.id })
            .update({ last_signin_at: db.fn.now() }),
        ]);
      } else {
        user = await db
          .table('users')
          .where(email ? { email } : db.raw('false'))
          .first();

        if (!user) {
          [user] = await db
            .table('users')
            .insert({
              email,
              username: profile.username || utils.generateUsername(),
              display_name: profile.displayName,
              photo_url: photo,
            })
            .returning('*');
        }

        await db.table('user_identities').insert({
          user_id: user.id,
          provider: profile.provider,
          id: profile.id,
          profile: JSON.stringify(profile._json),
          credentials: JSON.stringify(credentials),
        });
      }

      cb(null, user);
    } catch (err) {
      cb(err);
    }
  },
);
