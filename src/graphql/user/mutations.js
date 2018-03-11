/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import uuid from 'uuid/v4';
import shortid from 'shortid';
import firebase from 'firebase-admin';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import db from '../db';
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
        auth.createUser({ ...user, uid: id }),
        db.table('users').insert({
          id,
          username: shortid.generate(),
          email: user.email,
          display_name: user.displayName,
          photo_url: user.photoURL,
        }),
        auth.deleteUser(uid),
      ]);
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
