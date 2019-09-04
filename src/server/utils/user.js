/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import idx from 'idx';

import db from '../db';
import { generateUsername } from './username';

/**
 * Finds a user matching the provided Passport.js credentials. If user not
 * found, it attempts to create a new user account.
 */
export async function upsertUser(profile, credentials) {
  const identityKeys = {
    'user_identities.provider': profile.provider,
    'user_identities.provider_id': profile.id,
  };

  const email = idx(profile, x => x.emails[0].value);
  let photo = idx(profile, x => x.photos[0].value);
  if (photo && profile.provider === 'facebook') {
    photo = `https://graph.facebook.com/${profile.id}/picture?type=large`;
  }

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
        .update({ last_login_at: db.fn.now() }),
      photo &&
        db
          .table('users')
          .where({ id: user.id })
          .andWhere(x =>
            x
              .where('photo_url', 'like', '%googleusercontent.com/%')
              .orWhere('photo_url', 'like', '%facebook.com/%')
              .orWhere('photo_url', 'like', '%fbcdn.net/%')
              .orWhere('photo_url', 'like', '%fbsbx.com/%'),
          )
          .update({
            photo_url: photo,
          }),
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
          username: profile.username || (await generateUsername(email)),
          display_name: profile.displayName,
          photo_url: photo,
        })
        .returning('*');
    }

    await db.table('user_identities').insert({
      user_id: user.id,
      provider: profile.provider,
      provider_id: profile.id,
      profile: JSON.stringify(profile._json),
      credentials: JSON.stringify(credentials),
    });
  }

  return user;
}
