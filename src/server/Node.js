/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */
/* eslint-disable global-require */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { assignType, getType } from './utils';

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'User':
        return context.userById.load(id).then(assignType('User'));
      case 'Story':
        return context.storyById.load(id).then(assignType('Story'));
      case 'Comment':
        return context.commentById.load(id).then(assignType('Comment'));
      default:
        return null;
    }
  },
  obj => {
    switch (getType(obj)) {
      case 'User':
        return require('./user/UserType').default;
      case 'Story':
        return require('./story/StoryType').default;
      case 'Comment':
        return require('./story/CommentType').default;
      default:
        return null;
    }
  },
);
