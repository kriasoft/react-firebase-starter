/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import glamorous, { Span } from 'glamorous';

const KRIASOFT_URL = 'https://www.kriasoft.com/';
const LICENSE_URL =
  'https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt';

const Container = glamorous.div({
  padding: 24,
  color: 'rgba(255, 255, 255, 0.4)',
  backgroundColor: 'darkslategray',
});

const ExtLink = glamorous.a({
  color: 'rgba(255, 255, 255, 0.6)',
  textDecoration: 'none',
  ':active, :hover, :visted': { color: 'rgba(255, 255, 255, 0.6)' },
  ':visited': { textDecoration: 'underline' },
});

class AppFooter extends React.Component {
  render() {
    return (
      <Container>
        <Span paddingRight="0.5em">&copy; 2015-present</Span>
        <ExtLink href={KRIASOFT_URL}>Kriasoft</ExtLink>
        <Span paddingLeft="0.5em" paddingRight="0.5em">
          |
        </Span>
        <ExtLink href={LICENSE_URL}>MIT License</ExtLink>
      </Container>
    );
  }
}

export default AppFooter;
