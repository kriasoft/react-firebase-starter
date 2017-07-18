/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import router from '../router';
import history from '../history';
import Toolbar from '../Toolbar';
import s from './App.css';

class App extends React.Component {
  state = {
    menuOpen: false,
    route: {
      path: '/',
      title: null,
      hero: null,
      component: null,
    },
  };

  componentDidMount() {
    // Start watching for changes in the URL (window.location)
    this.unlisten = history.listen(this.renderComponent);
    this.renderComponent(history.location);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  renderComponent = (location) => {
    // Resolve the URL path (window.location) to a page (see pages.js)
    router.resolve({ path: location.pathname })
      .then(route => this.setState({ route }, () => {
        document.title = route.path === '/'
          ? `React Static | ${route.title}`
          : `${route.title} | React Static`;
      }));
  };

  toggleMenu = (event) => {
    this.setState(x => ({ menuOpen: !x.menuOpen }));
  };

  render() {
    return (
      <div>
        <Toolbar hero={this.state.route.hero} />
        <main className={s.content}>
          {this.state.route.component}
        </main>
      </div>
    );
  }
}

export default App;
