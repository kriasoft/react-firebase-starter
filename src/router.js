import { Router } from 'react-routing';
import React from 'react';
import Layout from './components/Layout';
import NotFoundPage from './pages/404';
import ErrorPage from './pages/500';

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return <Layout>{component}</Layout>;
  });

  /*-- Auto insert routes here --*/


  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>);

});

export default router;
