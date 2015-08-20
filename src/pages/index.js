/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import Link from '../utils/link';

export default class {

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Coming soon.</p>
        <a href="/about" onClick={Link.handleClick}>Go to About Page</a><br />
        <a href="/blog" onClick={Link.handleClick}>Go to Blog Page</a>
      </div>
    );
  }

};
