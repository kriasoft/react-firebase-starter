/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

function AdminLayout({ children }) {
  return <div>{children}</div>;
}

export default createFragmentContainer(AdminLayout, {
  data: graphql`
    fragment AdminLayout_data on Query {
      me {
        id
      }
    }
  `,
});
