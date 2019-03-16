/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { QueryRenderer } from 'react-relay';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from '../theme';
import ErrorPage from './ErrorPage';
import { gtag, getScrollPosition } from '../utils';
import { ConfigContext, HistoryContext, ResetContext } from '../hooks';

class App extends React.PureComponent {
  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidMount() {
    this.componentDidRender();
  }

  componentDidUpdate() {
    this.componentDidRender();
  }

  componentDidCatch(error, info) {
    console.log(error, info); // eslint-disable-line no-console
    gtag('event', 'exception', { description: error.message, fatal: false });
  }

  state = { error: null };

  componentDidRender = () => {
    const { history, title, config } = this.props;
    window.document.title = title;

    // Track page views
    gtag('config', config.gaTrackingId, { transport_type: 'beacon' });
    // fb(FB => FB.AppEvents.logPageView());

    const scrollY = getScrollPosition(history.location.key);

    if (scrollY && history.action === 'POP') {
      window.scrollTo(0, scrollY);
    } else {
      window.scrollTo(0, 0);
    }
  };

  resetError = () => {
    this.setState({ error: null });
  };

  renderProps = ({ error, props }) => {
    const err = this.state.error || this.props.error || error;
    return err ? (
      <ErrorPage error={err} onClose={this.resetError} />
    ) : (
      this.props.render(props || this.props.data)
    );
  };

  render() {
    const {
      config,
      history,
      reset,
      relay,
      query,
      variables,
      payload,
    } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <ConfigContext.Provider value={config}>
          <HistoryContext.Provider value={history}>
            <ResetContext.Provider value={reset}>
              <QueryRenderer
                environment={relay}
                query={query}
                variables={variables}
                render={this.renderProps}
                cacheConfig={{ payload }}
              />
            </ResetContext.Provider>
          </HistoryContext.Provider>
        </ConfigContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
