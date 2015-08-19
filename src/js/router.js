import { Router } from 'react-routing';
import React from 'react';
import Layout from './Layout';
import HomePage from './../index.js';
import AboutPage from './../about.js';
import NotFoundPage from './../404.js';
import ErrorPage from './../500.js';

const router = new Router(on => {

  on('*', async (state, next) => {         // Matches all URLs
    const component = await next();        // and wraps child components
    return <Layout>{component}</Layout>;   // into a common layout component
  });

  on('/', () => <HomePage />);
  on('/about', () => <AboutPage />);

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>);

});

export default router;
