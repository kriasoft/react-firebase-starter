/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';

// Provide default history object (for unit testing)
export const HistoryContext = React.createContext({
  location: { pathname: '/' },
});

export function useHistory() {
  return React.useContext(HistoryContext);
}
