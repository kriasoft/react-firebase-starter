/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Hero from './Hero';
import Home from './Home';

export default () => ({
  title: 'React Static',
  hero: <Hero />,
  component: <Home />,
});
