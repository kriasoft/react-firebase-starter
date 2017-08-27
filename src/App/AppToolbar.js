/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Glamorous from 'glamorous';
import { css } from 'glamor';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../Link';
import AppLogo from './AppLogo';
import type { AppToolbar_me } from './__generated__/AppToolbar_me.graphql';

const Header = Glamorous.header({
  position: 'relative',
  display: 'flex',
  width: '100%',
  boxSizing: 'border-box',
  color: '#fff',
  flexDirection: 'column',
  backgroundColor: 'darkslategray',
  justifyContent: 'space-between',
});

const Row = Glamorous.div({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: 64,
  boxSizing: 'border-box',
  alignItems: 'center',
  '@media (max-width: 959px) and (orientation: landscape)': { minHeight: 48 },
  '@media (max-width: 599px)': { minHeight: 56 },
});

const Section = Glamorous.section(props => ({
  zIndex: '1',
  display: 'inline-flex',
  minWidth: 0,
  height: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  ...(props.start && { justifyContent: 'flex-start', order: -1 }),
  ...(props.end && { justifyContent: 'flex-end', order: 1 }),
}));

const TitleLink = Glamorous(Link)({
  zIndex: 1,
  display: 'inline-flex',
  padding: '16px 0',
  margin: 0,
  marginLeft: 24,
  overflow: 'hidden',
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '1.25em',
  lineHeight: '1.5rem',
  color: '#00d8ff',
  textDecoration: 'none',
  textOverflow: 'ellipsis',
  letterSpacing: '0.0625em',
  whiteSpace: 'nowrap',
  alignSelf: 'center',
  alignItems: 'center',
  ':hover, :active, :visted': { color: '#00d8ff' },
  '@media (max-width: 599px)': { marginLeft: 16 },
});

const NavLink = Glamorous(Link)({
  paddingRight: '8px',
  paddingLeft: '8px',
  fontFamily: '"Roboto", sans-serif',
  fontSize: '14px',
  color: '#fff',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

const LastNavLink = Glamorous(NavLink)({
  marginRight: 24,
  '@media (max-width: 599px)': { marginRight: 16 },
});

const TitleLogo = Glamorous(AppLogo)({
  width: 48,
  height: 48,
  marginRight: 16,
});

const hero = css({
  maxWidth: 1000,
  alignSelf: 'center',
});

class AppToolbar extends React.Component {
  props: {
    me: AppToolbar_me,
    hero: React.Element<*>,
  };

  render() {
    return (
      <Header>
        <Row>
          <Section start>
            <TitleLink href="/">
              <TitleLogo />
              React Static
            </TitleLink>
          </Section>
          <Section end>
            <NavLink href="/getting-started">Get Started</NavLink>
            <LastNavLink href="/about">About</LastNavLink>
          </Section>
        </Row>
        {this.props.hero &&
          React.cloneElement(this.props.hero, { className: hero.toString() })}
      </Header>
    );
  }
}

export default createFragmentContainer(
  AppToolbar,
  graphql`
    fragment AppToolbar_me on User {
      displayName
    }
  `,
);
