/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '@firebase/app';

import App from './components/App';
import auth from './auth';
import history from './history';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  apiKey: 'AIzaSyAsuqpqt29-TIwBAu01Nbt5QnC3FIKO4A4',
  authDomain: 'react-firebase-graphql.firebaseapp.com',
  databaseURL: 'https://react-firebase-graphql.firebaseio.com',
  projectId: 'react-firebase-graphql',
  storageBucket: 'react-firebase-graphql.appspot.com',
  messagingSenderId: '564620986275',
});

const render = props =>
  new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <App {...props} />,
        document.getElementById('root'),
        resolve(props),
      );
    } catch (err) {
      reject(err);
    }
  });

const resolve = promise =>
  promise.then(({ user, location }) =>
    routes.resolve({
      pathname: location.pathname,
      location,
      user,
      render,
    }),
  );

let promise;

auth.onAuthStateChanged(user => {
  if (!promise) {
    promise = Promise.resolve({ user, location: history.location });
    history.listen(location => {
      promise = resolve(promise.then(x => ({ ...x, location })));
    });
  }
  promise = resolve(promise.then(x => ({ ...x, user })));
});

registerServiceWorker();
