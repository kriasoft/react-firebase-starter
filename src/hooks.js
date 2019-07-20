/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { ReactRelayContext } from 'react-relay';
import { fb } from './utils';

// Default history object (for unit tests)
const history = { location: { pathname: '/' } };

export const ConfigContext = React.createContext({});
export const HistoryContext = React.createContext(history);
export const ResetContext = React.createContext(() => {});

export function useConfig() {
  return React.useContext(ConfigContext);
}

export function useHistory() {
  return React.useContext(HistoryContext);
}

export function useRelay() {
  return React.useContext(ReactRelayContext);
}

export function useReset() {
  return React.useContext(ResetContext);
}

export function useFacebookEvent(event, callback) {
  React.useEffect(() => {
    fb(FB => FB.Event.subscribe(event, callback), { async: false });
    return fb(FB => FB.Event.unsubscribe(event, callback), { async: false });
  }, []);
}
