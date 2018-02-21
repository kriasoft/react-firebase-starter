/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation SignOutMutation {
    signOut(input: {}) {
      clientMutationId
    }
  }
`;

function commit(environment) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: {},
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
