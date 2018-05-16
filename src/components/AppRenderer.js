/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React, { Component, ComponentType } from 'react';
import ErrorPage from '../pages/ErrorPage';

const defaults = {
  title: null,
  component: null,
  error: null,
};

type State = {
  title: ?string,
  component: ?ComponentType,
  error: ?Error,
};

class AppRenderer extends Component<{}, State> {
  state = { ...defaults };

  componentDidUpdate() {
    if (this.state.title) {
      window.document.title = this.state.title;
    }
  }

  componentDidCatch(error) {
    this.setState({ ...defaults, error });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.component !== nextState.component ||
      this.state.error !== nextState.error ||
      this.state.title !== nextState.title
    );
  }

  renderRoute = (route, cb) => {
    this.setState({ ...defaults, ...route }, cb);
  };

  render() {
    return this.state.error ? (
      <ErrorPage error={this.state.error} />
    ) : this.state.component ? (
      this.state.component
    ) : null;
  }
}

export default AppRenderer;
