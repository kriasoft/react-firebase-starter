/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import cx from 'classnames';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../Link';
import AppLogo from './AppLogo';
import s from './AppToolbar.css';
import type { AppToolbar_me } from './__generated__/AppToolbar_me.graphql';

class AppToolbar extends React.Component {
  props: {
    me: AppToolbar_me,
    hero: React.Element<*>,
  };

  render() {
    return (
      <header className={s.root}>
        <div className={s.row}>
          <section className={cx(s.section, s.sectionStart)}>
            <Link className={cx(s.title)} href="/">
              <AppLogo className={cx(s.logo)} />
              React Static
            </Link>
          </section>
          <section className={cx(s.section, s.sectionEnd)}>
            <Link className={s.link} href="/getting-started">
              Get Started
            </Link>
            <Link className={s.link} href="/about">
              About
            </Link>
          </section>
        </div>
        {this.props.hero &&
          React.cloneElement(this.props.hero, {
            className: s.hero,
          })}
      </header>
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
