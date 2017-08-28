/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import glamorous from 'glamorous';

import history from '../history';
import Link from '../Link';

const color = '#607d8b';

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  '@media only screen and (max-width: 280px)': { width: '95%' },
});

const Main = glamorous.main({
  paddingBottom: 80,
  '@media screen and (max-width: 1024px)': { padding: '0 16px' },
});

const ErrorCode = glamorous.h1({
  margin: 0,
  fontSize: '15em',
  fontWeight: '300',
  lineHeight: '1em',
  color,
  letterSpacing: '0.02em',
  '@media screen and (max-width: 1024px)': { fontSize: '10em' },
});

const Title = glamorous.p({
  paddingBottom: '0.5em',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: '2em',
  fontWeight: 400,
  lineHeight: '1em',
  color,
  letterSpacing: '0.02em',
  '@media only screen and (max-width: 280px)': {
    margin: '0 0 0.3em',
    fontSize: '1.5em',
  },
  '@media screen and (max-width: 1024px)': { fontSize: '1.5em' },
});

const Text = glamorous.p({
  paddingBottom: 0,
  fontSize: '1.125em',
  lineHeight: '1.5em',
  color: `color(${color} alpha(50%))`,
  '@media only screen and (max-width: 280px)': { width: '95%' },
});

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
        : ['Error', 'Oups, something went wrong'];

    return (
      <Container>
        <Main>
          <ErrorCode>
            {code}
          </ErrorCode>
          <Title>
            {title}
          </Title>
          {code === '404' &&
            <Text>
              The page you&apos;re looking for does not exist or an another
              error occurred.
            </Text>}
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
