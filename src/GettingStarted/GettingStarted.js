/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import s from './GettingStarted.css';

class GettingStarted extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h2>Getting Started</h2>
        <p>Coming soon.</p>
        {Array.from({ length: 50 }).map(() => <br />)}
      </div>
    );
  }
}

export default GettingStarted;
