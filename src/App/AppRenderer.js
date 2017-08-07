/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import isEqual from 'lodash/isEqual';

import AppToolbar from './AppToolbar';
import AppFooter from './AppFooter';
import ErrorPage from '../ErrorPage';
import s from './AppRenderer.css';

type Props = {
  error: ?Error,
  data: ?Object,
  retry: () => void,
  location: Location,
  params: Object,
  components: Array<React.Element<*>> | Promise<Array<React.Element<*>>>,
  render: ?(Array<React.Element<*>>, ?Object, ?Object) => any,
};

type State = {
  error: ?Error,
  title: ?string,
  description: ?string,
  hero: ?React.Element<*>,
  body: ?React.Element<*>,
};

const defaults = {
  error: null,
  title: 'React Static Boilerplate',
  description: '',
  hero: null,
  body: null,
};

class AppRenderer extends React.Component<any, Props, State> {
  state = { ...defaults };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.error && this.props.error !== nextProps.error) {
      this.setState({ error: nextProps.error });
    } else if (
      this.props.data !== nextProps.data ||
      this.props.location !== nextProps.location ||
      !isEqual(this.props.params, nextProps.params) ||
      this.props.components !== nextProps.components ||
      this.props.render !== nextProps.render
    ) {
      const promise = Promise.resolve(nextProps.components);

      if (nextProps.render && nextProps.components === promise) {
        promise
          .then(components => {
            if (
              this.props.components === nextProps.components &&
              nextProps.render
            ) {
              this.setState({
                ...defaults,
                ...nextProps.render(
                  components,
                  this.props.data,
                  this.props.params,
                ),
              });
            }
          })
          .catch(error => this.setState({ error }));
      } else if (nextProps.render) {
        this.setState({
          ...defaults,
          ...nextProps.render(
            nextProps.components,
            nextProps.data,
            nextProps.params,
          ),
        });
      } else {
        this.setState({ error: new Error('The .render() method is missing.') });
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.props.error !== nextState.error ||
      this.state.title !== nextState.title ||
      this.state.description !== nextState.description ||
      this.state.hero !== nextState.hero ||
      this.state.body !== nextState.body
    );
  }

  render() {
    return this.state.error
      ? <ErrorPage error={this.state.error} />
      : <div>
          <AppToolbar me={null} hero={this.state.hero} />
          <main className={s.content}>
            {this.state.body || <p>Loading...</p>}
          </main>
          <AppFooter />
        </div>;
  }
}

export default AppRenderer;
