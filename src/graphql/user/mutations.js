/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import uuid from 'uuid-base62';
import firebase from 'firebase-admin';
import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import db from '../db';
import token from '../../token';
import UserType from './UserType';
import { fromGlobalId } from '../utils';
import type Context from '../Context';

const UUID_REGEXP = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export const signIn = mutationWithClientMutationId({
  name: 'SignIn',
  description: 'Authenticate a user with Firebase credentials.',

  inputFields: {
    idToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  outputFields: {
    token: {
      type: GraphQLString,
    },
  },

  async mutateAndGetPayload(input, ctx: Context) {
    const auth = firebase.auth();

    let { idToken, refreshToken } = input;
    let id, user, account;

    // Verify the provided Firebase ID token (JWT)
    const { uid } = await auth.verifyIdToken(idToken, true);

    // Convert Firebase UID into a UUID format
    try {
      id = UUID_REGEXP.test(uid) ? uid : uuid.decode(uid).match(UUID_REGEXP)[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to convert Firebase UID into a UUID format.`);
    }

    [user, account] = await Promise.all([
      db
        .table('users')
        .where({ id })
        .first(),
      auth.getUser(uid),
    ]);

    // Keep user's metadata up to date with Firebase
    const customClaims = account.customClaims || {};
    const metadata = {
      accounts: JSON.stringify(account.providerData),
      is_admin: customClaims.is_admin,
      created_at: account.metadata.creationTime,
      updated_at: db.fn.now(),
      last_signin_at: account.metadata.lastSignInTime,
    };

    if (!user) {
      [user] = await db
        .table('users')
        .insert({
          id,
          uid,
          username: uid,
          email: account.email,
          display_name: account.displayName,
          photo_url: account.photoURL,
          ...metadata,
        })
        .returning('*');
    } else {
      await db
        .table('users')
        .where({ id })
        .update({
          ...(!user.uid && { uid }),
          ...(!user.username && { username: uid }),
          ...(!user.email && { email: account.email }),
          ...(!user.display_name && { display_name: account.displayName }),
          ...(!user.photo_url && { photo_url: account.photoURL }),
          ...metadata,
        });
    }

    // Save database user ID in the Firebase account
    if (!customClaims.id) {
      await auth.setCustomUserClaims(uid, { id, ...customClaims });
      ({ id_token: idToken } = await token.renew(refreshToken));
    }

    // Save both Firebase ID token and refresh token in a session cookie
    // which is required by SSR. See src/authentication.js
    ctx.signIn(idToken, refreshToken);

    return { user };
  },
});

export const signOut = mutationWithClientMutationId({
  name: 'SignOut',
  description: 'Delete session cookie.',

  inputFields: {},
  outputFields: {},

  async mutateAndGetPayload(input: any, ctx: Context) {
    ctx.signOut();
    return {};
  },
});

export const updateUser = mutationWithClientMutationId({
  name: 'UpdateUser',
  description: 'Update user.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    user: { type: UserType },
  },

  async mutateAndGetPayload(input: any, ctx: Context) {
    const id = fromGlobalId(input.id, 'User');

    // Only the account owner or an admin can edit a user
    ctx.ensureIsAuthorized(user => user.id === id || user.isAdmin);

    function usernameAvailable(username) {
      return db
        .table('users')
        .where({ username })
        .whereNot({ id })
        .select(1)
        .then(x => !x.length);
    }

    // Validate and sanitize user input
    const data = await ctx.validate(input)(x =>
      x
        .field('username', { trim: true })
        .isLength({ min: 1, max: 50 })
        .is(usernameAvailable, 'That username is taken. Try another.')

        .field('email')
        .isLength({ max: 100 })
        .isEmail()

        .field('displayName', { as: 'display_name', trim: true })
        .isLength({ min: 1, max: 100 })

        .field('photoURL', { as: 'photo_url' })
        .isLength({ max: 250 })
        .isURL()

        .field('isAdmin', { as: 'is_admin' })
        .is(() => ctx.user.isAdmin, 'Only admins can change this field.'),
    );

    if (input.validateOnly) {
      return { user: null };
    }

    if (Object.keys(data).length) {
      await db
        .table('users')
        .where({ id })
        .update({ ...data, updated_at: db.fn.now() });

      if ('is_admin' in data) {
        await firebase.auth().setCustomUserClaims(id, {
          is_admin: data.is_admin,
        });
      }
    }

    const user = await db
      .table('users')
      .where({ id })
      .first();

    return { user };
  },
});

export const deleteUser = mutationWithClientMutationId({
  name: 'DeleteUser',
  description: 'Delete user.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {},

  async mutateAndGetPayload(input: any, ctx: Context) {
    // Only an admin can delete a user
    ctx.ensureIsAuthorized(user => user.isAdmin);
    const id = fromGlobalId(input.id, 'User');

    await db
      .table('users')
      .where({ id })
      .del();

    await firebase.auth().deleteUser(id);

    ctx.signOut();
    return {};
  },
});
