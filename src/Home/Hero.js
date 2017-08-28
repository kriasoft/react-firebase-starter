/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import glamorous, { Div } from 'glamorous';

import Link from '../Link';

const Title = glamorous.h2({
  fontFamily: '"Roboto Mono", monospace',
  letterSpacing: '1px',
});

const Description = glamorous.p({
  fontFamily: '"Roboto", sans-serif',
  letterSpacing: '1px',
});

const Button = glamorous(Link)({
  display: 'inline-block',
  padding: '0.5em 2em',
  marginTop: '1em',
  fontFamily: '"Roboto", sans-serif',
  color: '#333',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  backgroundColor: '#fff',
  borderRadius: '2px',
  '.button:active, .button:hover, .button:visited': {
    color: '#333',
  },
});

class Hero extends React.Component {
  static defaultProps = {
    className: null,
  };

  render() {
    return (
      <Div className={this.props.className} padding="1em 1em 2em">
        <Title>Bootstrap a new React app in 5 minutes!</Title>
        <Description>
          <strong>React Static</strong> is a popular boilerplate for building
          single-page applications and static web sites with React.
        </Description>
        <p>
          <Button href="/getting-started">Get Started</Button>
        </p>
      </Div>
    );
  }
}

export default Hero;
