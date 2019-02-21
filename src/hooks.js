/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { ReactRelayContext } from 'react-relay';

// Default history object (for unit tests)
const history = { location: { pathname: '/' } };

export const HistoryContext = React.createContext(history);
export const ResetContext = React.createContext(() => {});

export function useHistory() {
  return React.useContext(HistoryContext);
}

export function useRelay() {
  return React.useContext(ReactRelayContext);
}

export function useReset() {
  return React.useContext(ResetContext);
}
