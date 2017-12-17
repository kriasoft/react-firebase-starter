/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';

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
            <strong>React Starter Kit</strong> for Firebase and GraphQL
          </Typography>
          <Typography type="body1" paragraph>
            This is a boilerplate project for creating React applications.
          </Typography>
          <Typography type="body1" paragraph>
            <a href="https://github.com/kriasoft/react-firebase-starter">
              https://github.com/kriasoft/react-firebase-starter
            </a>
          </Typography>
        </Content>
      </Container>
    );
  }
}

export default Home;
