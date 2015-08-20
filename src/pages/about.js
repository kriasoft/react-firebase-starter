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
        <h1>About Us</h1>
        <p>Coming soon.</p>
        <a href="/" onClick={Link.handleClick}>Go to Home Page</a><br />
        <a href="/blog" onClick={Link.handleClick}>Go to Blog Page</a>
      </div>
    );
  }

};
