/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';

class Layout {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="Layout">
        {this.props.children}
      </div>
    );
  }

}

export default Layout;
