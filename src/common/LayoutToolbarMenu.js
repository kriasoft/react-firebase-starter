/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import LogoutLink from './LogoutLink';

const styles = theme => ({
  root: {},
});

function LayoutToolbarMenu({ classes: s, ...props }) {
  return (
    <Menu className={s.root} {...props}>
      <MenuItem onClick={props.onClose} component={LogoutLink}>
        Sign Out
      </MenuItem>
    </Menu>
  );
}

export default withStyles(styles)(LayoutToolbarMenu);
