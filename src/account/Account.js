/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { graphql, createFragmentContainer } from 'react-relay';

const Container = styled.div`
  max-width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Content = styled(Card)`
  padding: 1em 2em;
  margin: 2em 0;
`;

class Home extends React.Component<{}> {
  render() {
    return (
      <Container>
        <Content>
          <Typography type="headline" gutterBottom>
            My Account
          </Typography>
          <Typography type="body1" paragraph>
            Welcome, {this.props.user && this.props.user.displayName}!
          </Typography>
        </Content>
      </Container>
    );
  }
}

export default createFragmentContainer(
  Home,
  graphql`
    fragment AccountFragment on Query {
      me {
        id
      }
    }
  `,
);
