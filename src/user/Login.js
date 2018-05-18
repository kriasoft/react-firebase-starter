/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Typography from '@material-ui/core/Typography';

import LoginButton from '../common/LoginButton';

injectGlobal`
  body {
    margin: 0;
    background: rgb(250, 250, 250);
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    resize: vertical;
  }
`;

const Container = styled.div`
  display: flex;
  padding-bottom: 20vh;
  margin: 0 auto;
  flex-direction: column;
`;

const Title = styled(Typography)`
  && {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const ErrorContainer = styled(Typography)`
  && {
    margin-bottom: 1rem;
    color: red;
    text-align: center;
  }
`;

const StyledLoginButton = styled(LoginButton)`
  && {
    margin-bottom: 1rem;
  }
`;

class Login extends React.Component<{}> {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  state = { error: null };

  componentDidMount() {
    const {
      location: { search, origin },
      top,
      opener,
    } = window;

    if (search.includes('success') && top) {
      if (opener) {
        opener.postMessage('login:success', origin);
      } else {
        this.context.history.push('/');
      }
    } else if (search.includes('error')) {
      const params = search.slice(1).split('=');
      const error = decodeURI(params[params.indexOf('error') + 1]);

      this.setState({ error });
    }
  }

  render() {
    return (
      <Container>
        <Title variant="headline">Sign In</Title>
        <StyledLoginButton provider="google" />
        <StyledLoginButton provider="facebook" />
        <ErrorContainer>{this.state.error}</ErrorContainer>
      </Container>
    );
  }
}

export default Login;
