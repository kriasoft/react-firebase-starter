/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';

export default class {

  static propTypes = {
    error: PropTypes.instanceOf(Error),
  };

  render() {
    return (
      <div>
        <h1>Error</h1>
        <pre>{
          this.props.error ?
            this.props.error.message + '\n\n' + this.props.error.stack :
            'An critical error occurred.'
        }</pre>
      </div>
    );
  }

}
