/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from '../../theme';
import Toolbar from './Toolbar';
import Footer from './Footer';

const Container = styled.div`
  height: 100vh;
  background: url(http://koistya.github.io/files/background-v1-1920x1080.jpg)
    no-repeat center center fixed;
  background-size: cover;
`;

//http://koistya.github.io/files/background-v1-1920x1080.jpg

class App extends React.Component<{}> {
  componentDidMount() {
    window.document.title = this.props.route.title;
  }

  componentDidUpdate() {
    window.document.title = this.props.route.title;
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <Toolbar user={this.props.user} />
          {this.props.route.body}
          <Footer />
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
