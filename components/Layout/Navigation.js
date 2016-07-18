/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';

class Navigation extends React.Component {

  componentDidMount() {
		if (window.componentHandler && this.root) {
			window.componentHandler.upgradeElement(this.root);
		}
  }

  componentWillUnmount() {
		if (window.componentHandler && this.root) {
			window.componentHandler.downgradeElements(this.root);
		}
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => (this.root = node)}>
        <Link className="mdl-navigation__link" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/about">About</Link>
        <Link className="mdl-navigation__link" to="/not-found">Not Found</Link>
      </nav>
    );
  }

}

export default Navigation;
