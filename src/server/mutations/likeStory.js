/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLID } from 'graphql';

import db from '../db';
import StoryType from '../story/StoryType';
import { fromGlobalId } from '../utils';

export const likeStory = mutationWithClientMutationId({
  name: 'LikeStory',

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
