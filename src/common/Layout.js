/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { createFragmentContainer, graphql } from 'react-relay';

import LayoutToolbar from './LayoutToolbar';
import LayoutFooter from './LayoutFooter';
import AutoUpdater from './AutoUpdater';

const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
    body: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.background.default,
    },
  },
  background: {
    backgroundColor: '#3f51b5',
    backgroundImage: 'linear-gradient(-225deg, #3db0ef, #5e5bb7)',
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

function Layout(props) {
  const { hero, data, children } = props;
  const s = useStyles();

  return (
    <>
      <LayoutToolbar me={data.me} {...(!hero && { className: s.background })} />
      {hero && (
        <div className={s.background}>
          <div className={s.toolbar} />
          {hero}
        </div>
      )}
      {!hero && <div className={s.toolbar} />}
      {children}
      <LayoutFooter />
      <AutoUpdater user={data.me} />
    </>
  );
}

export default createFragmentContainer(Layout, {
  data: graphql`
    fragment Layout_data on Query {
      me {
        ...LayoutToolbar_me
        ...AutoUpdater_user
      }
    }
  `,
});
