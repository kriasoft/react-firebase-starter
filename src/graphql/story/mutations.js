/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import slug from 'slug';
import { firestore } from 'firebase-admin';
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import validate from './validate';
import StoryType from './StoryType';
import { fromGlobalId } from '../utils';
import { ValidationError } from '../errors';
import type Context from '../Context';

const inputFields = {
  title: {
    type: GraphQLString,
  },
  text: {
    type: GraphQLString,
  },
};

const outputFields = {
  story: {
    type: StoryType,
  },
};

export const createStory = mutationWithClientMutationId({
  name: 'CreateStory',
  description: 'Create a new story.',

  inputFields,
  outputFields,

  async mutateAndGetPayload(input: any, ctx: Context) {
    ctx.ensureIsAuthenticated();

    const { data, errors } = validate(input);

    if (errors.length) {
      throw new ValidationError(errors);
    }

    const timestamp = firestore.FieldValue.serverTimestamp();

    data.authorId = ctx.user.uid;
    data.slug = slug(data.title, { lowercase: true });
    data.approved = ctx.user.admin ? true : false;
    data.createdAt = timestamp;
    data.updatedAt = timestamp;

    const story = await firestore()
      .collection('stories')
      .add(data);

    return { story };
  },
});

export const updateStory = mutationWithClientMutationId({
  name: 'UpdateStory',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ...inputFields,
  },
  outputFields,

  async mutateAndGetPayload(input, ctx: Context) {
    ctx.ensureIsAuthenticated();

    const id = fromGlobalId(input.id, 'Story');
    const db = firestore();

    const { data, errors } = validate(input);

    if (errors.length) {
      throw new ValidationError(errors);
    }

    const story = await db
      .collection('stories')
      .doc(id)
      .get();

    // TODO: Update story
    console.log('story:', story, data);

    return { story };
  },
});
