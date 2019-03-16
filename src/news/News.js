/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Snakbar from '@material-ui/core/Snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { withStyles } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../common/Link';
import LikeStoryMutation from './mutations/LikeStory';
import SubmitDialog from './SubmitDialog';

const styles = theme => ({
  root: {
    ...theme.mixins.content,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  listItemText: {
    paddingRight: 0,
    '&& a': {
      color: 'rgba(0, 0, 0, 0.8)',
      textDecoration: 'none',
    },
    '&& > p > a': {
      paddingLeft: '1em',
      textDecoration: 'none',
    },
    '&& a:hover': {
      textDecoration: 'underline',
    },
    '&& > p > a:hover': {
      color: 'rgba(0, 0, 0, 0.8)',
      textDecoration: 'none',
    },
    '&& > p': {
      display: 'flex',
    },
    '&& > p > span:first-child': {
      flexGrow: 1,
    },
    '&& > p svg': {
      width: 18,
      height: 18,
      marginRight: 4,
      verticalAlign: 'bottom',
    },
  },
});

function News({ classes: s, data, ...props }) {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState();
  const { stories } = data;

  function reset() {
    setError(null);
  }

  function like(event) {
    event.preventDefault();
    reset();
    const id = event.currentTarget.id;
    const { environment } = props.relay;
    LikeStoryMutation.commit(environment, { id }).catch(err => {
      if (err.code === 401) {
        props.logIn();
      } else {
        setError(err.message);
      }
    });
  }

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h3" gutterBottom>
        <span className={s.grow}>News</span>
        <Button onClick={openDialog}>Submit a Story</Button>
      </Typography>
      <Typography gutterBottom>
        The latest news from React.js community. This page demonstrates how to
        do basic CRUD operations with GraphQL and Relay (see{' '}
        <a
          href="https://github.com/kriasoft/react-firebase-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code
        </a>
        ).
      </Typography>
      <List>
        {(stories || []).map(x => (
          <ListItem
            className={s.listItem}
            key={x.id}
            style={{ paddingLeft: 0 }}
          >
            <ListItemAvatar>
              <Avatar src={x.author.photoURL} alt={x.author.displayName} />
            </ListItemAvatar>
            <ListItemText
              className={s.listItemText}
              primary={
                x.isURL ? (
                  <a href={x.text}>
                    {x.title}{' '}
                    <OpenInNewIcon
                      style={{ width: 10, height: 10, verticalAlign: 'top' }}
                    />
                  </a>
                ) : (
                  <Link href={`/news/${x.slug}`}>{x.title}</Link>
                )
              }
              secondary={
                <>
                  <span>
                    by{' '}
                    <Link href={`/@${x.author.username}`}>
                      {x.author.displayName}
                    </Link>{' '}
                    | {x.createdAt}
                  </span>
                  <Link href={`/news/${x.slug}`}>
                    <ChatBubbleOutlineIcon /> (0)
                  </Link>
                  <a id={x.id} href={`/news/${x.slug}`} onClick={like}>
                    {x.pointGiven ? <FavoriteIcon /> : <FavoriteBorderIcon />}(
                    {x.pointsCount})
                  </a>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Snakbar open={!!error} message={error} onClose={reset} />
      <SubmitDialog data={data} open={isOpen} onClose={closeDialog} />
    </div>
  );
}

export default withStyles(styles)(
  createFragmentContainer(
    News,
    graphql`
      fragment News on Query {
        ...SubmitDialog
        stories {
          id
          slug
          title
          text
          isURL
          createdAt(format: "MMM Do, YYYY")
          author {
            username
            displayName
            photoURL
          }
          pointsCount
          pointGiven
        }
      }
    `,
  ),
);
