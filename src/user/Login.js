/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

injectGlobal`
  body {
    margin: 0;
    background: rgb(250, 250, 250);
  }

  #root {
    display: flex;
    height: 100%;
    padding: 20px;
    overflow: auto;
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

const StyledButton = styled(Button)`
  && {
    margin-bottom: 1rem;
    font-size: 1em;
    font-weight: 100;
    text-transform: none;
    letter-spacing: 1px;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 0.625em;
  }

  path {
    fill: #fff;
  }

  strong {
    margin-left: 0.375em;
    font-weight: 400;
  }
`;

const GoogleIcon = () => (
  <svg aria-labelledby="simpleicons-google-icon" role="img" viewBox="0 0 24 24">
    <title id="simpleicons-google-icon">Google icon</title>
    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    aria-labelledby="simpleicons-facebook-icon"
    role="img"
    viewBox="0 0 24 24"
  >
    <title id="simpleicons-facebook-icon">Facebook icon</title>
    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
  </svg>
);

class Login extends React.Component<{}> {
  state = { error: null };

  componentDidMount() {
    const { location: { search, origin }, top, opener } = window;

    if (search.includes('success') && top) {
      opener.postMessage({ result: 'awesome' }, origin);
    } else if (search.includes('error')) {
      const params = search.slice(1).split('=');
      const error = params[params.indexOf('error') + 1];

      this.setState({ error });
    }
  }

  render() {
    return (
      <Container>
        <Title variant="headline">Sign In</Title>
        <StyledButton
          variant="raised"
          color="primary"
          component="a"
          href="/login/google"
        >
          <GoogleIcon />
          Continue with <strong>Google</strong>
        </StyledButton>
        <StyledButton
          variant="raised"
          color="primary"
          component="a"
          href="/login/facebook"
        >
          <FacebookIcon />
          Continue with <strong>Facebook</strong>
        </StyledButton>
        <ErrorContainer>{this.state.error}</ErrorContainer>
      </Container>
    );
  }
}

export default Login;
