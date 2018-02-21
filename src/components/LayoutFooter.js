/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';

import Link from './Link';

const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.4);
`;

const Text = styled(Typography)`
  padding: 1em;
`;

const Copyright = styled.span`
  padding-right: 0.5em;
`;

const Separator = styled.span`
  padding-right: 0.5em;
  padding-left: 0.5em;
`;

const ExtLink = styled.a`
  &,
  &:hover,
  &:active,
  &:visited {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink = styled(Link)`
  &,
  &:hover,
  &:active,
  &:visited {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

class LayoutFooter extends React.Component<{}> {
  render() {
    return (
      <Container>
        <Text variant="body1">
          <Copyright css="padding-right: 0.5em">&copy; 2015-present</Copyright>
          <ExtLink href="https://github.com/kriasoft">Kriasoft</ExtLink>
          <Separator>|</Separator>
          <StyledLink href="/privacy">Privacy</StyledLink>
        </Text>
      </Container>
    );
  }
}

export default LayoutFooter;
