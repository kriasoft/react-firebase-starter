/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from '../theme';
import ErrorPage from '../pages/ErrorPage';
import { gtag } from '../utils';
import { HistoryContext, ResetContext } from '../hooks';

const defaults = {
  title: null,
  component: null,
  error: null,
};

type State = {
  title: ?string,
  component: ?React.ComponentType<any>,
  error: ?Error,
};

class AppRenderer extends React.Component<{}, State> {
  state = { ...defaults };

  componentDidUpdate() {
    if (this.state.title) {
      window.document.title = this.state.title;
    }
    gtag('config', window.config.gaTrackingId, {
      page_title: this.state.title,
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
    });
  }

  componentDidCatch(error: any) {
    gtag('event', 'exception', { description: error.message, fatal: false });
    this.setState({ ...defaults, error });
  }

  shouldComponentUpdate(nextProps: {}, nextState: State) {
    return (
      this.state.component !== nextState.component ||
      this.state.error !== nextState.error ||
      this.state.title !== nextState.title
    );
  }

  renderRoute = (route: any, cb: () => any) => {
    this.setState({ ...defaults, ...route }, cb);
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HistoryContext.Provider value={this.props.history}>
          <ResetContext.Provider value={this.props.reset}>
            {this.state.error ? (
              <ErrorPage error={this.state.error} />
            ) : this.state.component ? (
              this.state.component
            ) : null}
          </ResetContext.Provider>
        </HistoryContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default AppRenderer;
