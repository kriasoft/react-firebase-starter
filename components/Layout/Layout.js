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
import Header from './Header';
import Navigation from './Navigation';
import Footer from '../Footer';
import s from './Layout.css';

class Layout extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.refs.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.refs.root);
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout" ref="root">
        <div className="mdl-layout__inner-container">
          <Header>
            <span className="mdl-layout-title">React Static Boilerplate</span>
            <div className="mdl-layout-spacer"></div>
            <Navigation />
          </Header>
          <main className="mdl-layout__content">
            <div className={s.content} {...this.props} />
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
