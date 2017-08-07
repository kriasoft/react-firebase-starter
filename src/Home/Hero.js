/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import cx from 'classnames';
import Link from '../Link';
import s from './Hero.css';

class Hero extends React.Component {
  static defaultProps = {
    className: null,
  };

  render() {
    return (
      <div className={cx(s.root, this.props.className)}>
        <h2 className={s.title}>Bootstrap a new React app in 5 minutes!</h2>
        <p className={s.desc}>
          <strong>React Static</strong> is a popular boilerplate for building
          single-page applications and static web sites with React.
        </p>
        <p>
          <Link className={s.button} href="/getting-started">
            Get Started
          </Link>
        </p>
      </div>
    );
  }
}

export default Hero;
