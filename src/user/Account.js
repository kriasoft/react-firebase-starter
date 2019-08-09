/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createFragmentContainer, graphql } from 'react-relay';

const useStyles = makeStyles({
  container: {
    maxWidth: 600,
    boxSizing: 'border-box',
    margin: '0 auto',
  },
  content: {
    padding: '1em 2em',
    margin: '2em 0',
  },
});

function Account(props) {
  const s = useStyles();

  return (
    <div className={s.container}>
      <Card className={s.content}>
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>
        <Typography paragraph>
          Welcome, {props.user && props.user.displayName}!
        </Typography>
      </Card>
    </div>
  );
}

export default createFragmentContainer(
  Account,
  graphql`
    fragment Account on Query {
      me {
        id
        username
        displayName
        photoURL
      }
    }
  `,
);
