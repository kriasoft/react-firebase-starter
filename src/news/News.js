/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import { createFragmentContainer, graphql } from 'react-relay';

import Link from '../common/Link';
import SubmitDialog from './SubmitDialog';
import LikeStoryMutation from '../mutations/LikeStory';
import { useAuth } from '../hooks';

const useStyles = makeStyles(theme => ({
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
}));

function News(props) {
  const { data, relay } = props;
  const { stories } = data;
  const self = React.useRef({});
  const [dialog, setDialog] = React.useState({ open: false });
  const [error, setError] = React.useState();
  const auth = useAuth();
  const s = useStyles();

  // Retry the last mutation after the user signs in
  React.useEffect(() => {
    if (self.current.retryLike) {
      LikeStoryMutation.commit(relay.environment, self.current.retryLike);
    }
  }, [self.current.retryLike]);

  function reset() {
    setError(null);
  }

  function like(event) {
    event.preventDefault();
    reset();
    const id = event.currentTarget.id;
    LikeStoryMutation.commit(relay.environment, id, err => {
      if (err && err.code === 401) {
        auth.signIn().then(user => {
          if (user) self.current.retryLike = id;
        });
      }
    });
  }

  function openDialog() {
    setDialog({ open: true, key: Date.now() });
  }

  function closeDialog() {
    setDialog({ open: false });
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
                <React.Fragment>
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
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <Snakbar open={!!error} message={error} onClose={reset} />
      <SubmitDialog
        key={dialog.key}
        open={dialog.open}
        onClose={closeDialog}
        me={data.me}
      />
    </div>
  );
}

export default createFragmentContainer(News, {
  data: graphql`
    fragment News_data on Query {
      me {
        ...SubmitDialog_me
      }
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
});
