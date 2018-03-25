/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation DeleteUserMutation($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      clientMutationId
    }
  }
`;

function commit(environment, input) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { input },
      onCompleted(response, errors) {
        if (errors) {
          reject(errors[0]);
        } else {
          resolve();
        }
      },
      onError: reject,
    });
  });
}

export default { commit };
