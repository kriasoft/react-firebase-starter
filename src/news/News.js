/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Snakbar from 'material-ui/Snackbar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import ChatBubbleOutlineIcon from 'material-ui-icons/ChatBubbleOutline';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';
import { graphql, createFragmentContainer } from 'react-relay';

import auth from '../auth';
import Link from '../components/Link';
import LikeStoryMutation from './mutations/LikeStory';

const StyledListItem = styled(ListItem)`
  && {
    padding-right: 0;
    padding-left: 0;
  }
`;

const StyledListItemText = styled(ListItemText)`
  && {
    padding-right: 0;
  }

  && a {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
  }

  && > p > a {
    padding-left: 1em;
    color: rgba(0, 0, 0, 0.54);
  }

  && a:hover {
    text-decoration: underline;
  }

  && > p > a:hover {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
  }

  && > p {
    display: flex;
  }

  && > p > span:first-child {
    flex-grow: 1;
  }

  && > p svg {
    width: 18px;
    height: 18px;
    margin-right: 4px;
    vertical-align: bottom;
  }
`;

class News extends React.Component<{}> {
  state = { error: null };

  like = event => {
    event.preventDefault();
    this.reset();
    const id = event.currentTarget.id;
    const { environment } = this.props.relay;
    LikeStoryMutation.commit(environment, { id }).catch(err => {
      if (err.code === 401) {
        auth.showLoginDialog();
      } else {
        this.setState({ error: err.message });
      }
    });
  };

  reset = () => this.setState({ error: null });

  render() {
    const { data: { stories } } = this.props;
    const { error } = this.state;
    return (
      <>
        <Typography variant="body1" gutterBottom>
          The latest news from React.js community.
        </Typography>
        <List>
          {(stories || []).map(x => (
            <StyledListItem key={x.id} style={{ paddingLeft: 0 }}>
              <ListItemAvatar>
                <Avatar src={x.author.photoURL} alt={x.author.displayName} />
              </ListItemAvatar>
              <StyledListItemText
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
                    <span>{x.author.displayName}</span>
                    <Link href={`/news/${x.slug}`}>
                      <ChatBubbleOutlineIcon /> (0)
                    </Link>
                    <a id={x.id} href={`/news/${x.slug}`} onClick={this.like}>
                      {x.pointGiven ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      ({x.pointsCount})
                    </a>
                  </>
                }
              />
            </StyledListItem>
          ))}
        </List>
        <Snakbar open={!!error} message={error} onClose={this.reset} />
      </>
    );
  }
}

export default createFragmentContainer(
  News,
  graphql`
    fragment News on Query {
      stories {
        id
        slug
        title
        text
        isURL
        createdAt
        author {
          photoURL
          displayName
        }
        pointsCount
        pointGiven
      }
    }
  `,
);
