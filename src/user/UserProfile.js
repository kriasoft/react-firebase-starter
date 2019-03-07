/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';

const styles = theme => ({
  root: {
    ...theme.mixins.content,
  },
});

function UserProfile({ classes: s, data: user }) {
  return (
    <div className={s.root}>
      <Typography
        variant="h5"
        style={{ display: 'flex', alignItems: 'center' }}
        gutterBottom
      >
        <Avatar
          src={user.photoURL}
          alt={user.displayName}
          style={{ marginRight: '1rem' }}
        />
        {user.displayName}
      </Typography>
      <Typography paragraph>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&#39;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
    </div>
  );
}

export default withStyles(styles)(
  createFragmentContainer(
    UserProfile,
    graphql`
      fragment UserProfile on User {
        id
        username
        displayName
        photoURL
      }
    `,
  ),
);
