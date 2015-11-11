/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import s from './Navigation.scss';
import Link from '../Link';

function Navigation() {
  return (
    <ul className={s.root} role="menu">
      <li className={s.item}>
        <a className={s.link} href="/" onClick={Link.handleClick}>Home</a>
      </li>
      <li className={s.item}>
        <a className={s.link} href="/about" onClick={Link.handleClick}>About</a>
      </li>
    </ul>
  );
}

export default Navigation;
