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
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../components/Link';

const StyledItem = styled(ListItemText)`
  && a {
    color: #333;
    text-decoration: none;
  }
  && a:hover {
    text-decoration: underline;
  }
`;

class News extends React.Component<{}> {
  render() {
    const { data: { stories } } = this.props;
    return (
      <>
        <Typography variant="body1" gutterBottom>
          The latest news from React.js community.
        </Typography>
        <List>
          {(stories || []).map(x => (
            <ListItem key={x.id}>
              <ListItemAvatar>
                <Avatar src={x.author.photoURL} alt={x.author.displayName} />
              </ListItemAvatar>
              <StyledItem
                primary={
                  x.isURL ? (
                    <a href={x.text}>{x.title}</a>
                  ) : (
                    <Link href={`/news/${x.slug}`}>{x.title}</Link>
                  )
                }
                secondary={x.author.displayName}
              />
            </ListItem>
          ))}
        </List>
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
      }
    }
  `,
);
