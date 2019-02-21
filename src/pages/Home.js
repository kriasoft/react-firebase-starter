/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';

function Home() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        <strong>React Starter Kit</strong> for Firebase
      </Typography>
      <Typography paragraph>
        This is a boilerplate project for creating React applications.
      </Typography>
      <Typography paragraph>
        <a href="https://github.com/kriasoft/react-firebase-starter">
          https://github.com/kriasoft/react-firebase-starter
        </a>
      </Typography>
      <Typography paragraph>
        View{' '}
        <strong>
          <a href="/graphql">API</a>
        </strong>{' '}
        &{' '}
        <strong>
          <a href="/graphql/model">data model</a>
        </strong>{' '}
        | Follow us on{' '}
        <strong>
          <a href="https://twitter.com/ReactStarter">Twitter</a>
        </strong>{' '}
        | Visit our <strong>sponsors</strong>:
      </Typography>
      <Typography paragraph style={{ verticalAlign: 'center' }}>
        <a
          href="https://rollbar.com/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://files.tarkus.me/rollbar-384x64.png"
            width="192"
            height="32"
            alt="Rollbar"
          />
        </a>
        <sup>
          <a href="https://rollbar.com/jobs/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)">
            Hiring
          </a>
        </sup>{' '}
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://files.tarkus.me/digital-ocean-393x64.png"
            width="196.5"
            height="32"
            alt="DigitalOcean"
          />
        </a>
      </Typography>
    </>
  );
}

export default Home;
