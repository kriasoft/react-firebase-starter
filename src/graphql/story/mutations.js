/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import slug from 'slug';
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import db from '../db';
import validate from './validate';
import StoryType from './StoryType';
import { fromGlobalId } from '../utils';
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
    const data = validate(input, ctx);
    ctx.ensureIsValid();

    data.author_id = ctx.user.id;
    data.slug = slug(data.title, { lowercase: true });
    data.approved = ctx.user.isAdmin ? true : false;

    const [story] = await db
      .table('stories')
      .insert(data)
      .returning('*');

    console.log(story);

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
    const data = validate(input, ctx);

    ctx.ensureIsValid();

    await db
      .table('stories')
      .where({ id })
      .update(data);

    return ctx.storyById.load(id).then(story => ({ story }));
  },
});
