/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createFragmentContainer, graphql } from 'react-relay';

function AdminUserList(props) {
  return (
    <>
      <Typography variant="h3">Users</Typography>
      <List>
        <ListItem>User A</ListItem>
        <ListItem>User B</ListItem>
        <ListItem>User C</ListItem>
      </List>
    </>
  );
}

export default createFragmentContainer(AdminUserList, {
  data: graphql`
    fragment AdminUserList_data on Query {
      me {
        id
      }
    }
  `,
});
