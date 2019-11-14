/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import uuid from 'uuid';
import slugify from 'slugify';
import validator from 'validator';
import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import db from '../db';
import { StoryType } from '../types';
import { fromGlobalId } from '../utils';

function slug(text) {
  return slugify(text, { lower: true });
}

export const upsertStory = mutationWithClientMutationId({
  name: 'UpsertStory',
  description: 'Creates or updates a story.',

  inputFields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    approved: { type: GraphQLBoolean },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    story: { type: StoryType },
  },

  async mutateAndGetPayload(input, ctx) {
    const id = input.id ? fromGlobalId(input.id, 'Story') : null;
    const newId = uuid.v4();

    let story;

    if (id) {
      story = await db
        .table('stories')
        .where({ id })
        .first();

      if (!story) {
        throw new Error(`Cannot find the story # ${id}.`);
      }

      // Only the author of the story or admins can edit it
      ctx.ensureIsAuthorized(
        user => story.author_id === user.id || user.isAdmin,
      );
    } else {
      ctx.ensureIsAuthorized();
    }

    // Validate and sanitize user input
    const data = await ctx.validate(
      input,
      id ? 'update' : 'create',
    )(x =>
      x
        .field('title', { trim: true })
        .isRequired()
        .isLength({ min: 5, max: 80 })

        .field('text', { alias: 'URL or text', trim: true })
        .isRequired()
        .isLength({ min: 10, max: 1000 })

        .field('text', {
          trim: true,
          as: 'is_url',
          transform: x => validator.isURL(x, { protocols: ['http', 'https'] }),
        })

        .field('approved')
        .is(() => ctx.user.isAdmin, 'Only admins can approve a story.'),
    );

    if (data.title) {
      data.slug = `${slug(data.title)}-${(id || newId).substr(29)}`;
    }

    if (id && Object.keys(data).length) {
      [story] = await db
        .table('stories')
        .where({ id })
        .update({ ...data, updated_at: db.fn.now() })
        .returning('*');
    } else {
      [story] = await db
        .table('stories')
        .insert({
          id: newId,
          ...data,
          author_id: ctx.user.id,
          approved: ctx.user.isAdmin ? true : false,
        })
        .returning('*');
    }

    return { story };
  },
});

export const likeStory = mutationWithClientMutationId({
  name: 'LikeStory',
  description: 'Marks the story as "liked".',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  outputFields: {
    story: { type: StoryType },
  },

  async mutateAndGetPayload(input, ctx) {
    // Check permissions
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
