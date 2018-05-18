/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  padding: 2em 0 5em;
  background-color: #3f51b5;
  background-image: linear-gradient(-225deg, #3db0ef, #5e5bb7);
  flex-shrink: 0;
`;

const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Title = styled.h1`
  padding: 0;
  margin: 0 1rem 0.5em;
  font-family: 'Roboto Mono', Roboto, Arial, sans-serif;
  font-size: 2em;
  font-weight: 100;
  color: #fff;
`;

const Summary = styled.p`
  padding: 0;
  margin: 0 1rem;
  font-family: Roboto, Arial, sans-serif;
  font-size: 1em;
  font-weight: 100;
  line-height: 1.5em;
  color: #fff;
  letter-spacing: 1px;

  && strong {
    font-weight: 300;
  }
`;

class LayoutHeader extends React.Component {
  render() {
    return (
      <Root>
        <Container>
          <Title>React Starter Kit</Title>
          <Summary>
            Bootstrap new <strong>React.js</strong> + <strong>Firebase</strong>{' '}
            application projects<br />
            in minutes, using modern mainstream libraries and tooling<br />
            with zero dependency on 3rd party frameworks.
          </Summary>
        </Container>
      </Root>
    );
  }
}

export default LayoutHeader;
