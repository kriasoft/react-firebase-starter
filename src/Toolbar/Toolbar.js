/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import cx from 'classnames';
import Link from '../Link';
import Logo from './Logo';
import s from './Toolbar.css';

class Toolbar extends React.Component {
  static defaultProps = {
    hero: null,
  };

  render() {
    return (
      <header className={s.root}>
        <div className={s.row}>
          <section className={cx(s.section, s.sectionStart)}>
            <Link className={cx(s.title)} href="/">
              <Logo className={cx(s.logo)} />
              React Static
            </Link>
          </section>
          <section className={cx(s.section, s.sectionEnd)}>
            <Link className={s.link} href="/">Home</Link>
            <Link className={s.link} href="/getting-started">Getting Started</Link>
            <Link className={s.link} href="/about">About</Link>
          </section>
        </div>
        {this.props.hero && React.cloneElement(this.props.hero, {
          className: s.hero,
        })}
      </header>
    );
  }
}

export default Toolbar;
