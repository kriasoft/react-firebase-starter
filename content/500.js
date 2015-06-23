/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import React, { PropTypes } from 'react';

export default class {

  static propTypes = {
    error: PropTypes.instanceOf(Error)
  };

  render() {
    return (
      <div>
        <h1>Error</h1>
        <pre>{this.props.error.message + '\n\n' + this.props.error.stack}</pre>
      </div>
    );
  }

};
