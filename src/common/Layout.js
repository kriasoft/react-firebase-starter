/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createFragmentContainer, graphql } from 'react-relay';

import AppBar from './AppBar';
import LayoutFooter from './LayoutFooter';
import AutoUpdater from './AutoUpdater';
import UserSettingsDialog from './UserSettingsDialog';

const useStyles = makeStyles(theme => ({
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
  const [userSettings, setUserSettings] = React.useState({ open: false });
  const s = useStyles();

  function openUserSettings() {
    setUserSettings({ open: true, key: Date.now() });
  }

  function closeUserSettings() {
    setUserSettings({ open: false });
  }

  return (
    <React.Fragment>
      <AppBar
        me={data.me}
        {...(!hero && { className: s.background })}
        onOpenSettings={openUserSettings}
      />
      {hero && (
        <div className={s.background}>
          <div className={s.toolbar} />
          {hero}
        </div>
      )}
      {!hero && <div className={s.toolbar} />}
      {children}
      <LayoutFooter />
      <AutoUpdater me={data.me} />
      <UserSettingsDialog
        key={userSettings.key}
        open={userSettings.open}
        onClose={closeUserSettings}
        me={data.me}
      />
    </React.Fragment>
  );
}

export default createFragmentContainer(Layout, {
  data: graphql`
    fragment Layout_data on Query {
      me {
        ...AppBar_me
        ...AutoUpdater_me
        ...UserSettingsDialog_me
      }
    }
  `,
});
