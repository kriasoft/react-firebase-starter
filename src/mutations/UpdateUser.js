/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation UpdateUserMutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
          user {
            ...UserSettingsDialog_me
            id
          }
        }
      }
    `,

    variables: { input },

    onCompleted({ updateUser }, errors) {
      done(
        errors ? errors[0].state || { '': [errors[0].message] } : null,
        updateUser && updateUser.user,
      );
    },
  });
}

export default { commit };
