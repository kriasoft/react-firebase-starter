/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h2>About Us</h2>
        <p>Coming soon.</p>
        {Array.from({ length: 50 }).map((_, i) => <br key={i} />)}
      </div>
    );
  }
}

export default AboutPage;
