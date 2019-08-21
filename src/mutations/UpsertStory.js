/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation UpsertStoryMutation($input: UpsertStoryInput!) {
        upsertStory(input: $input) {
          story {
            id
            title
            text
            slug
            createdAt
            updatedAt
          }
        }
      }
    `,

    variables: { input },

    onCompleted({ upsertStory }, errors) {
      done(
        errors ? errors[0].state || { '': [errors[0].message] } : null,
        upsertStory && upsertStory.story,
      );
    },
  });
}

export default { commit };
