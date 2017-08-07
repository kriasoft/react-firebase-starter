/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import s from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h2>Welcome to React Static Boilerplate</h2>
        <p>Coming soon.</p>
        {Array.from({ length: 50 }).map(() => <br />)}
      </div>
    );
  }
}

export default Home;
