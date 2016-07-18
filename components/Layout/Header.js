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

class Header extends React.Component {

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
      <header className="mdl-layout__header" ref={node => (this.root = node)}>
        <div className="mdl-layout__header-row" {...this.props} />
      </header>
    );
  }

}

export default Header;
