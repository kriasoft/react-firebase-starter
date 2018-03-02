/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import slug from 'slug';
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import db from '../../db';
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

    if (errors.length) throw new ValidationError(errors);

    data.author_id = ctx.user.uid;
    data.slug = slug(data.title, { lowercase: true });
    data.approved_at = ctx.user.admin ? db.RAW('current_timestamp') : null;

    const story = await db
      .insert(data)
      .into('stories')
      .returning(['id']);

    return db.storyById.load(story.id).then(rows => rows[0]);
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
    const { data, errors } = validate(input);

    if (errors.length) throw new ValidationError(errors);

    const story = await db
      .table('stories')
      .where({ id })
      .update(data);

    await db.storyById.clear(story.id);

    return db.storyById.load(story.id).then(rows => rows[0]);
  },
});
