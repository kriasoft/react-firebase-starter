/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation SignInMutation($input: SignInInput!) {
    signIn(input: $input) {
      token
    }
  }
`;

function commit(environment, input) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { input },
      onCompleted({ signIn }, errors) {
        if (errors) {
          reject(errors[0]);
        } else {
          resolve(signIn);
        }
      },
      onError: reject,
    });
  });
}

export default { commit };
