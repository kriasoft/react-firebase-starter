/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import clsx from 'clsx';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createFragmentContainer, graphql } from 'react-relay';

import Link from './Link';
import AppBar from './AppBar';
import LoginLink from './LoginLink';
import LayoutToolbarMenu from './LayoutToolbarMenu';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  button: {
    textTransform: 'none',
    fontWeight: 400,
  },
}));

function LayoutToolbar(props) {
  const { className, me } = props;
  const [userMenuEl, setUserMenuEl] = React.useState(null);
  const s = useStyles();

  function openUserMenu(event) {
    setUserMenuEl(event.currentTarget);
  }

  function closeUserMenu() {
    setUserMenuEl(null);
  }

  return (
    <AppBar className={clsx(s.root, className)} me={me}>
      <Button
        className={s.button}
        color="inherit"
        component={Link}
        href="/news"
      >
        News
      </Button>
      {me ? (
        <React.Fragment>
          <Avatar
            className={s.avatar}
            src={me.photoURL}
            alt={me.displayName}
            onClick={openUserMenu}
            aria-owns={userMenuEl ? 'user-menu' : null}
            aria-haspopup="true"
          />
          <LayoutToolbarMenu
            id="user-menu"
            role="menu"
            open={Boolean(userMenuEl)}
            anchorEl={userMenuEl}
            onClose={closeUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: -56,
              horizontal: 82,
            }}
          />
        </React.Fragment>
      ) : (
        <Button className={s.button} color="inherit" component={LoginLink}>
          Log In / Sign Up
        </Button>
      )}
    </AppBar>
  );
}

export default createFragmentContainer(LayoutToolbar, {
  me: graphql`
    fragment LayoutToolbar_me on User {
      ...AppBar_me
      id
      displayName
      photoURL
    }
  `,
});
