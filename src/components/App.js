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
import Route from './Route';

type Props = {
  history: any,
  route: any,
  user: any,
};

function renderRoute(route) {
  return renderRoute.onRender(route);
}

function onRender(render) {
  renderRoute.onRender = render;
}

class App extends React.Component<Props> {
  static childContextTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    reset: PropTypes.func.isRequired,
  };

  state = {
    route: null,
    query: null,
    variables: null,
    relay: this.props.createRelay(),
  };

  getChildContext() {
    return {
      history: this.props.history,
      reset: this.reset,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.renderLocation);
    this.renderLocation(history.location);
  }

  componentWillUnmount() {
    this.unlisten();
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
        renderRoute,
      })
      .then(route => {
        if (route.redirect) {
          history.push(route.redirect);
        }
      });
  };

  fetchQuery = (query, variables) => {
    this.setState({ query, variables });
    return new Promise((resolve, reject) => {
      this.resolveFetchQuery = resolve;
      this.rejectFetchQuery = reject;
    });
  };

  renderReadyState = ({ error, props }) => {
    if (error && this.rejectFetchQuery) {
      this.rejectFetchQuery(error);
      this.rejectFetchQuery = null;
    } else if (props && this.resolveFetchQuery) {
      this.resolveFetchQuery(props);
      this.resolveFetchQuery = null;
    }

    return <Route onRender={onRender} />;
  };

  render() {
    const { relay, query, variables } = this.state;

    return (
      <QueryRenderer
        environment={relay}
        query={query}
        variables={variables || {}}
        render={this.renderReadyState}
      />
    );
  }
}

export default App;
