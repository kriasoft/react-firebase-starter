/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import isEqual from 'lodash/isEqual';
import { graphql, QueryRenderer } from 'react-relay';

import relay from '../relay';
import router from '../router';
import history from '../history';
import AppRenderer from './AppRenderer';

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment App_me on User {
    ...AppToolbar_me
  }
`;

type ReadyState = {
  error: ?Error,
  props: ?Object,
  retry: ?() => void,
};

type Render = (Array<React.Element<*>>, ?Object, ?Object) => any;

type State = {
  location: Location,
  params: Object,
  query: ?Object,
  variables: Object,
  components: ?Array<React.Element<*>> | Promise<Array<React.Element<*>>>,
  render: ?Render,
};

class App extends React.Component<any, any, State> {
  state = {
    location: history.location,
    params: {},
    query: null,
    variables: {},
    components: null,
    render: null,
  };

  unlisten: () => void;

  componentDidMount() {
    // Start watching for changes in the URL (window.location)
    this.unlisten = history.listen(this.resolveRoute);
    this.resolveRoute(history.location);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  resolveRoute = (location: Location) =>
    // Find the route that matches the provided URL path and query string
    router.resolve({ path: location.pathname }).then(route => {
      const variables = isEqual(this.state.variables, route.variables)
        ? this.state.variables
        : route.variables;
      this.setState({ ...route, location, variables });
    });

  renderState = ({ error, props, retry }: ReadyState) =>
    <AppRenderer
      error={error}
      data={props}
      retry={retry}
      location={this.state.location}
      params={this.state.params}
      components={this.state.components}
      render={this.state.render}
    />;

  render() {
    return (
      <QueryRenderer
        environment={relay}
        query={this.state.query}
        variables={this.state.variables}
        render={this.renderState}
      />
    );
  }
}

export default App;
