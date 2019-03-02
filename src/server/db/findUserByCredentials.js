/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import idx from 'idx';
import db from './';

/**
 * Generates a random username for new users.
 */
export function generateUsername() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/**
 * Finds a user matching the provided Passport.js credentials. If user not
 * found, it atempts to create a new user account.
 */
export default async function findUserByCredentials(profile, credentials) {
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
          username: profile.username || generateUsername(),
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
