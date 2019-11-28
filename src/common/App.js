/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryRenderer } from 'react-relay';
import { ROOT_ID, REF_KEY } from 'relay-runtime';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from '../theme';
import ErrorPage from './ErrorPage';
import LoginDialog from './LoginDialog';
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
    const { history, location, startTime, title, config, relay } = this.props;
    window.document.title = title;

    // Get the current user's ID
    const root = relay.getStore().getSource().get(ROOT_ID); // prettier-ignore
    const userId = root && root.me ? atob(root.me[REF_KEY]).substr(5) : '';

    // Track page views, render time, etc.
    gtag('config', config.gaTrackingId, {
      transport_type: 'beacon',
      user_id: userId,
    });
    gtag('event', 'timing_complete', {
      name: 'load',
      value: Math.round(performance.now() - startTime),
      event_category: 'Render Complete',
    });

    const scrollY = getScrollPosition(location.key);

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
    ) : props ? (
      this.props.render(props || this.props.data)
    ) : null;
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
              <CssBaseline />
              <QueryRenderer
                environment={relay}
                query={query}
                variables={variables}
                render={this.renderProps}
                cacheConfig={{ payload }}
              />
              <LoginDialog />
            </ResetContext.Provider>
          </HistoryContext.Provider>
        </ConfigContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
