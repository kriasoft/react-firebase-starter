/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from 'material-ui/Typography';

class Home extends React.Component<{}> {
  render() {
    return (
      <>
        <Typography variant="headline" gutterBottom>
          <strong>React Starter Kit</strong> for Firebase
        </Typography>
        <Typography variant="body1" paragraph>
          This is a boilerplate project for creating React applications.
        </Typography>
        <Typography variant="body1" paragraph>
          <a href="https://github.com/kriasoft/react-firebase-starter">
            https://github.com/kriasoft/react-firebase-starter
          </a>
        </Typography>
      </>
    );
  }
}

export default Home;
