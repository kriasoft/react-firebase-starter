/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import Link from '../Link';

export default class {

  render() {
    return (
      <ul className="Navigation" role="menu">
        <li><a href="/" onClick={Link.handleClick}>Home</a></li>
        <li><a href="/about" onClick={Link.handleClick}>About</a></li>
      </ul>
    );
  }

}
