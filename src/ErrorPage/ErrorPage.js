/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';

import history from '../history';
import Link from '../Link';

const color = '#607d8b';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 280px) {
    width: 95%;
  }
`;

const Main = styled.main`
  padding-bottom: 80px;
  @media screen and (max-width: 1024px) {
    padding: 0 16px;
  }
`;

const ErrorCode = styled.h1`
  margin: 0;
  font-size: 15em;
  font-weight: 300;
  line-height: 1;
  color: ${color};
  letter-spacing: 0.02em;
  @media screen and (max-width: 1024px) {
    font-size: 10em;
  }
`;

const Title = styled.p`
  padding-bottom: 0.5em;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 2em;
  font-weight: 400;
  line-height: 1em;
  color: ${color};
  letter-spacing: 0.02em;
  @media only screen and (max-width: 280px) {
    margin: 0 0 0.3em;
    font-size: 1.5em;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.5em;
  }
`;

const Text = styled.p`
  padding-bottom: 0;
  font-size: 1.125em;
  line-height: 1.5em;
  color: color(${color} alpha(50%));
  @media only screen and (max-width: 280px) {
    width: 95%;
  }
`;

type Props = {
  error: ?Error,
};

class ErrorPage extends React.Component<any, Props, any> {
  componentDidMount() {
    document.title =
      this.props.error && this.props.error.status === 404
        ? 'Page Not Found'
        : 'Error';
  }

  goBack = (event: MouseEvent) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    if (this.props.error) {
      console.error(this.props.error); // eslint-disable-line no-console
    }

    const [code, title] =
      this.props.error && this.props.error.status === 404
        ? ['404', 'Page not found']
        : ['Error', 'Oops, something went wrong'];

    return (
      <Container>
        <Main>
          <ErrorCode>{code}</ErrorCode>
          <Title>{title}</Title>
          {code === '404' && (
            <Text>
              The page you&apos;re looking for does not exist or an another
              error occurred.
            </Text>
          )}
          <Text>
            <a href="/" onClick={this.goBack}>
              Go back
            </a>
            , or head over to the&nbsp;
            <Link href="/">home page</Link>
            to choose a new direction.
          </Text>
        </Main>
      </Container>
    );
  }
}

export default ErrorPage;
