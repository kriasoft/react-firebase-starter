/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { fetchQuery, graphql } from 'react-relay';
import { useRelay } from './useRelay';

let promise;
let state = [null /* firebase client */, undefined /* firebase user */];
let listeners = new Set();

export function useFirebase() {
  const relay = useRelay();
  const [, setState] = React.useState(state);

  React.useEffect(() => {
    listeners.add(setState);

    function authenticate(firebase) {
      // Fetch Firebase authentication token from our API
      const query = graphql`
        query useFirebaseQuery {
          me {
            firebaseToken
          }
        }
      `;

      fetchQuery(relay.environment, query, {}).then(({ me }) => {
        if ((me || {}).firebaseToken) {
          firebase
            .auth()
            .signInWithCustomToken((me || {}).firebaseToken)
            .catch(console.error);
        } else {
          firebase.auth().signOut();
        }
      });

      return firebase;
    }

    if (promise) {
      promise = promise.then(authenticate);
    } else {
      promise = Promise.all([
        import(/* webpackChunkName: 'firebase' */ '@firebase/app'),
        import(/* webpackChunkName: 'firebase' */ '@firebase/auth'),
      ]).then(([{ default: firebase }]) => {
        // Initialize Firebase Client SDK
        if (!firebase.apps.length) {
          firebase.initializeApp(window.config.firebase);
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        }

        // Save the current Firebase user to the component's state
        firebase.auth().onAuthStateChanged(user => {
          if (
            JSON.stringify(state[1] && state[1].toJSON()) !==
              JSON.stringify(user && user.toJSON()) ||
            state[0] !== firebase
          ) {
            state = [firebase, user];
            listeners.forEach(x => x(state));
          }
        });

        return authenticate(firebase);
      });
    }

    return () => listeners.delete(setState);
  }, []);

  return state;
}
