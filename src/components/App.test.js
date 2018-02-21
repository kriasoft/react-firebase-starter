/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createMemoryHistory';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App history={createHistory()} route={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
