/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import uuid from 'uuid/v4';
import shortid from 'shortid';
import firebase from 'firebase-admin';
import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import db from '../db';
import UserType from './UserType';
import { fromGlobalId } from '../utils';
import type Context from '../Context';

const UUID_V4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

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
    const { idToken, refreshToken } = input;
    let token;

    // Verify the provided Firebase ID token (JWT)
    const { uid } = await auth.verifyIdToken(idToken, true);
    const user = await auth.getUser(uid);

    // If the user's UID is not in UUID v4 format, drop this
    // user account and create a new one.
    if (!UUID_V4_REGEX.test(uid)) {
      let id = uuid();
      [token] = await Promise.all([
        auth.createCustomToken(id),
        auth.deleteUser(uid),
      ]);
      await auth.createUser({ ...user, uid: id });
    } else {
      const [{ count }] = await db
        .table('users')
        .where({ id: user.uid })
        .select(db.raw('count(*)'));
      if (parseInt(count, 10) === 0) {
        await db.table('users').insert({
          id: user.uid,
          username: shortid.generate(),
          email: user.email,
          display_name: user.displayName,
          photo_url: user.photoURL,
          accounts: JSON.stringify(user.providerData),
        });
      }
    }

    // Save both Firebase ID token and refresh token
    // into a session cookie which is required by SSR
    ctx.signIn(idToken, refreshToken);

    return { token };
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
