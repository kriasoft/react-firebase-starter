/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';

// html,
// body,
// #root {
//   height: 100%;
// }
// body {
//   padding: 0;
//   margin: 0;
//   font-family: sans-serif;
// }

function Html({ title, body }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link
          rel="manifest"
          href={`${process.env.PUBLIC_URL || ''}/manifest.json`}
        />
        <link
          rel="shortcut icon"
          href={`${process.env.PUBLIC_URL || ''}/favicon.ico`}
        />
        <title>{title || 'React App'}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono"
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
      </body>
    </html>
  );
}

export default Html;
