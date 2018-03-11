/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

export default {
  firebase:
    process.env.GCP_PROJECT === 'react-firebase-graphql'
      ? // Production
        {
          apiKey: 'AIzaSyAsuqpqt29-TIwBAu01Nbt5QnC3FIKO4A4',
          authDomain: 'react-firebase-graphql.firebaseapp.com',
          databaseURL: 'https://react-firebase-graphql.firebaseio.com',
          projectId: 'react-firebase-graphql',
          storageBucket: 'react-firebase-graphql.appspot.com',
          messagingSenderId: '564620986275',
        }
      : // Development/test
        {
          apiKey: 'AIzaSyAsuqpqt29-TIwBAu01Nbt5QnC3FIKO4A4',
          authDomain: 'react-firebase-graphql.firebaseapp.com',
          databaseURL: 'https://react-firebase-graphql.firebaseio.com',
          projectId: 'react-firebase-graphql',
          storageBucket: 'react-firebase-graphql.appspot.com',
          messagingSenderId: '564620986275',
        },
};
