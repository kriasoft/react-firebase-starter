/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import { createStore } from 'redux';

// Centralized application state
// For more information visit http://redux.js.org/
const initialState = { count: 0 };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
});

export default store;
