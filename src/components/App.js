/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';

import router from '../router';
import AppRenderer from './AppRenderer';

import auth from '../auth';

type Props = {
  history: any,
  createRelay: () => any,
};

class App extends React.Component<Props> {
  static childContextTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    reset: PropTypes.func.isRequired,
  };

  state = {
    query: null,
    variables: null,
    render: () => <AppRenderer ref={this.rendererRef} />,
    relay: this.props.createRelay(),
  };

  childContext = {
    history: this.props.history,
    reset: () => this.setState({ relay: this.props.createRelay() }),
  };

  getChildContext() {
    return this.childContext;
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.renderLocation);
    this.renderLocation(history.location);
    this.authUnlisten = auth.onAuthStateChanged(() => {
      this.reset();
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.authUnlisten();
  }

  reset = () => {
    this.setState({ relay: this.props.createRelay() });
  };

  renderLocation = location => {
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

  fetchQuery = (query, variables) => {
    return new Promise((resolve, reject) => {
      this.setState({
        query,
        variables,
        render: ({ error, props }) => {
          if (error) {
            reject(error);
          } else if (props !== null) {
            resolve(props);
          }
          return <AppRenderer ref={this.rendererRef} />;
        },
      });
    });
  };

  rendererRef = node => {
    this.renderer = node;
  };

  renderRoute = route => {
    this.renderer.renderRoute(route);
  };

  render() {
    const { relay, query, variables, render } = this.state;
    return (
      <QueryRenderer
        environment={relay}
        query={query}
        variables={variables || {}}
        render={render}
      />
    );
  }
}

export default App;
