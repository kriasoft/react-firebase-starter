/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import slug from 'slug';
import validator from 'validator';
import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import db from '../db';
import StoryType from './StoryType';
import { fromGlobalId } from '../utils';
import type Context from '../Context';

function validate(input, ctx: Context, id) {
  function unique(slug) {
    return db
      .table('stories')
      .where({ slug })
      .whereNot(id ? { id } : {})
      .select(1)
      .then(x => !x.length);
  }

  return ctx.validate(input)(x =>
    x
      .field('title', { trim: true })
      .isRequired(input.validateOnly)
      .isLength({ min: 5, max: 80 })

      .field('title', {
        trim: true,
        as: 'slug',
        transform: x => slug(x, { lowercase: true }).toLowerCase(),
      })
      .is(unique, 'A story with that title already exists.')

      .field('text', { alias: 'URL or text', trim: true })
      .isRequired(input.validateOnly)
      .isLength({ min: 10, max: 1000 })

      .field('text', {
        trim: true,
        as: 'is_url',
        transform: x => validator.isURL(x, { protocols: ['http', 'https'] }),
      })

      .field('approved')
      .is(() => ctx.user.isAdmin, 'Only admins can approve a story.'),
  );
}

export const createStory = mutationWithClientMutationId({
  name: 'CreateStory',
  description: 'Create a new story.',

  inputFields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    story: { type: StoryType },
  },

  async mutateAndGetPayload(input: any, ctx: Context) {
    ctx.ensureIsAuthorized();

    // Validate and sanitize user input
    const data = await validate(input, ctx);

    if (input.validateOnly) {
      return { story: null };
    }

    data.author_id = ctx.user.id;
    data.approved = ctx.user.isAdmin ? true : false;

    const [story] = await db
      .table('stories')
      .insert(data)
      .returning('*');

    return { story };
  },
});

export const updateStory = mutationWithClientMutationId({
  name: 'UpdateStory',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    approved: { type: GraphQLBoolean },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    story: { type: StoryType },
  },

  async mutateAndGetPayload(input, ctx: Context) {
    const id = fromGlobalId(input.id, 'Story');
    let story = await db
      .table('stories')
      .where({ id })
      .first();

    // Only the author of the story or an admin can edit a story
    ctx.ensureIsAuthorized(user => user.isAdmin || story.author_id === user.id);

    // Validate and sanitize user input
    const data = await validate(input, ctx, id);

    if (Object.keys(data).length) {
      await db
        .table('stories')
        .where({ id })
        .update(data);
    }

    story = await db
      .table('stories')
      .where({ id })
      .first();

    return { story };
  },
});

export const likeStory = mutationWithClientMutationId({
  name: 'LikeStory',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  outputFields: {
    story: { type: StoryType },
  },

  async mutateAndGetPayload(input, ctx: Context) {
    ctx.ensureIsAuthorized();
    const id = fromGlobalId(input.id, 'Story');
    const keys = { story_id: id, user_id: ctx.user.id };

    const points = await db
      .table('story_points')
      .where(keys)
      .select(1);

    if (points.length) {
      await db
        .table('story_points')
        .where(keys)
        .del();
    } else {
      await db.table('story_points').insert(keys);
    }

    const story = db
      .table('stories')
      .where({ id })
      .first();

    return { story };
  },
});
