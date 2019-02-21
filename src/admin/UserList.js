/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

function UserList({ children }) {
  return <div>{children}</div>;
}

export default createFragmentContainer(
  UserList,
  graphql`
    fragment UserListAdmin on Query {
      me {
        id
      }
    }
  `,
);
