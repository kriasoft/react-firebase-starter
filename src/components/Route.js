/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { Component } from 'react';

type Props = {
  onRender: () => () => void,
};

let promise = Promise.resolve();

class Route extends Component<Props> {
  state: {
    component: null,
    data: null,
  };

  componentWillMount() {
    this.props.onRender(
      route =>
        (promise = promise.then(
          () =>
            new Promise((resolve, reject) => {
              this.setState(route);
              this.resolve = resolve;
              this.reject = reject;
            }),
        )),
    );
  }

  componentDidUpdate() {
    if (this.resolve) {
      this.resolve();
      this.resolve = null;
      this.reject = null;
    }

    if (this.state && this.state.title) {
      window.document.title = this.state.title;
    }
  }

  componentDidCatch(err) {
    if (this.reject) {
      this.reject(err);
      this.resolve = null;
      this.reject = null;
    }
  }

  render() {
    return this.state && this.state.component ? this.state.component : null;
  }
}

export default Route;
