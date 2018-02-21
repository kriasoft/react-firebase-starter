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
  background-color: #3f51b5;
  background-image: linear-gradient(-225deg, #3db0ef, #5e5bb7);
  flex-shrink: 0;
  padding: 2em 0 5em;
`;

const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0 0 0.5em;
  padding: 0;
  color: #fff;
  font-family: 'Roboto Mono', Roboto;
  font-size: 2em;
  font-weight: 100;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Summary = styled.p`
  color: #fff;
  font-family: Roboto;
  font-size: 1em;
  font-weight: 100;
  letter-spacing: 1px;
  line-height: 1.5em;
  margin: 0;
  padding: 0;
  margin-left: 1rem;
  margin-right: 1rem;

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
