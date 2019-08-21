/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';

export const ConfigContext = React.createContext({});

export function useConfig() {
  return React.useContext(ConfigContext);
}
