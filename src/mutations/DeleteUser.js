/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { commitMutation, graphql } from 'react-relay';

function commit(environment, id) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation DeleteUserMutation($input: DeleteUserInput!) {
        deleteUser(input: $input) {
          clientMutationId
          deletedUserId
        }
      }
    `,

    variables: { input: { id } },
  });
}

export default { commit };
