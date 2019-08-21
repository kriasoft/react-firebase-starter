/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { ReactRelayContext } from 'react-relay';

export function useRelay() {
  return React.useContext(ReactRelayContext);
}
