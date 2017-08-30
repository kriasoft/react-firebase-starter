/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';

import Link from '../Link';

const Container = styled.div`padding: 1em 1em 2em;`;

const Title = styled.h2`
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 1px;
`;

const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  letter-spacing: 1px;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5em 2em;
  margin-top: 1em;
  font-family: 'Roboto', sans-serif;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #fff;
  border-radius: 2px;

  &:active,
  &:hover,
  &:visited {
    color: #333;
  }
`;

class Hero extends React.Component {
  render() {
    return (
      <Container {...this.props}>
        <Title>Bootstrap a new React app in 5 minutes!</Title>
        <Description>
          <strong>React Static</strong> is a popular boilerplate for building
          single-page applications and static web sites with React.
        </Description>
        <p>
          <Button href="/getting-started">Get Started</Button>
        </p>
      </Container>
    );
  }
}

export default Hero;
