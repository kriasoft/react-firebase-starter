/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createFragmentContainer, graphql } from 'react-relay';

function AdminStoryList(props) {
  return (
    <React.Fragment>
      <Typography variant="h1">Stories</Typography>
      <List>
        <ListItem><Typography variant="h2">Group 1</h1></Typography></ListItem>
        <ListItem>Story A</ListItem>
        <ListItem>Story B</ListItem>
        <ListItem>Story C</ListItem>
      </List>
      <List>
        <ListItem><Typography variant="h2">Group 2</h1></Typography></ListItem>
        <ListItem>Story A</ListItem>
        <ListItem>Story B</ListItem>
        <ListItem>Story C</ListItem>
      </List>
      <List>
        <ListItem><Typography variant="h2">Group 3</h1></Typography></ListItem>
        <ListItem>Story A</ListItem>
        <ListItem>Story B</ListItem>
        <ListItem>Story C</ListItem>
      </List>
    </React.Fragment>
  );
}

export default createFragmentContainer(AdminStoryList, {
  data: graphql`
    fragment AdminStoryList_data on Query {
      me {
        id
      }
    }
  `,
});
