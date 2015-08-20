/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import Link from '../../utils/link';

export default class {

  render() {
    return (
      <div>
        <h1>Blog</h1>
        <p>Coming soon.</p>
        <a href="/blog/test-article-one" onClick={Link.handleClick}>Test Article One</a><br />
        <a href="/blog/test-article-two" onClick={Link.handleClick}>Test Article Two</a><br /><br />

        <a href="/" onClick={Link.handleClick}>Go to Home Page</a><br />
        <a href="/about" onClick={Link.handleClick}>Go to About Page</a>
      </div>
    );
  }

};
