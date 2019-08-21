/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';

export const ResetContext = React.createContext(() => {});

export function useReset() {
  return React.useContext(ResetContext);
}
