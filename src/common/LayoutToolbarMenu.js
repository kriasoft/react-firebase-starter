/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import LogoutLink from './LogoutLink';

const useStyles = makeStyles(theme => ({
  root: {},
}));

function LayoutToolbarMenu(props) {
  const s = useStyles();

  return (
    <Menu className={s.root} {...props}>
      <MenuItem onClick={props.onClose} component={LogoutLink}>
        Sign Out
      </MenuItem>
    </Menu>
  );
}

export default LayoutToolbarMenu;
