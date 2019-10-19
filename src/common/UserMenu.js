/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import clsx from 'clsx';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import Settings from '../icons/Settings';
import Logout from '../icons/Logout';
import { useAuth } from '../hooks';

const useStyles = makeStyles(theme => ({
  list: {
    minWidth: 140,
  },
  icon: {
    minWidth: 32,
  },
}));

function UserMenu(props) {
  const { className, onOpenSettings, ...other } = props;
  const open = Boolean(props.anchorEl);
  const auth = useAuth();
  const s = useStyles();

  const openSettings = React.useCallback(() => {
    props.onClose();
    onOpenSettings();
  }, [props.onClose, onOpenSettings]);

  function signOut() {
    props.onClose();
    auth.signOut();
  }

  return (
    <Menu
      open={open}
      MenuListProps={{
        className: clsx(s.list, className),
        dense: true,
      }}
      getContentAnchorEl={undefined}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...other}
    >
      <MenuItem onClick={openSettings} dense>
        <ListItemIcon className={s.icon}>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem onClick={signOut} dense>
        <ListItemIcon className={s.icon}>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
}

export default UserMenu;
