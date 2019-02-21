/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { QueryRenderer } from 'react-relay';

import router from '../router';
import AppRenderer from './AppRenderer';

type Props = {
  history: any,
  createRelay: () => any,
};

type State = {
  query: any,
  variables: any,
  render: () => any,
};

class App extends React.Component<Props, State> {
  onRenderComplete: any;
  dispose: any;

  state = {
    query: null,
    variables: null,
    render: () => (
      <AppRenderer
        ref={this.rendererRef}
        history={this.props.history}
        reset={this.reset}
      />
    ),
  };

  relay = this.props.createRelay();
  rendererRef = React.createRef();

  componentDidMount() {
    const { history } = this.props;
    this.dispose = history.listen(this.renderLocation);
    this.renderLocation(history.location);

    // Hot Module Replacement
    // https://webpack.js.org/guides/hot-module-replacement/
    if (module.hot) {
      module.hot.accept('../router', () => {
        router.renderLocation(history.location);
      });
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  renderLocation = (location: Location) => {
    const { history } = this.props;
    router
      .resolve({
        pathname: location.pathname,
        fetchQuery: this.fetchQuery,
      })
      .then(route => {
        if (route.redirect) {
          history.push(route.redirect);
        } else {
          this.renderRoute(route);
        }
      });
  };

  fetchQuery: (query: any, variables: any) => Promise<any> = (
    query,
    variables,
  ) => {
    return new Promise((resolve, reject) => {
      this.setState({
        query,
        variables,
        render: ({ error, props }) => {
          if (error) {
            const err = new Error(error.message);
            err.code = error.code;
            reject(err);
          } else if (props !== null) {
            resolve(props);
          }
          return (
            <AppRenderer
              ref={this.rendererRef}
              history={this.props.history}
              reset={this.reset}
            />
          );
        },
      });
    });
  };

  renderRoute = (route: any) => {
    this.rendererRef.current.renderRoute(route, this.onRenderComplete);
  };

  reset = () => {
    this.relay = this.props.createRelay();
    this.props.history.replace(this.props.history.location);
    return new Promise(resolve => {
      this.onRenderComplete = resolve;
    });
  };

  render() {
    const { query, variables, render } = this.state;

    return (
      <QueryRenderer
        environment={this.relay}
        query={query}
        variables={variables || {}}
        render={render}
      />
    );
  }
}

export default App;
