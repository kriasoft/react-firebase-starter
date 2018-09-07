/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';
import { compose } from 'recompose';

import Link from './Link';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import AutoUpdater from './AutoUpdater';
import withAuth from '../common/withAuth';

const styles = theme => ({
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
    body: {
      padding: 0,
      margin: 0,
      fontFamily: 'sans-serif',
    },
  },
  container: {
    height: '100vh',
    background: '#f9f9f9',
  },
  body: {
    maxWidth: 640,
    marginTop: -48,
    marginRight: 'auto',
    marginLeft: 'auto',
    '&&': {
      background: 'transparent',
    },
  },
  toolbar: {
    display: 'flex',
    background: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: theme.spacing.unit * 2,
    background: theme.palette.common.white,
  },
  tab: {
    minWidth: 'inherit',
  },
  separator: {
    flexGrow: 1,
  },

  avatar: {
    width: 32,
    height: 32,
    margin: '8px 10px',
    cursor: 'pointer',
  },
  login: {
    textTransform: 'none',
    borderRadius: 0,
  },
});

class Layout extends React.Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    userMenuEl: null,
  };

  openUserMenu = event => {
    this.setState({ userMenuEl: event.currentTarget });
  };

  closeUserMenu = () => {
    this.setState({ userMenuEl: null });
  };

  logOut = () => {
    this.setState({ userMenuEl: null });
    this.props.logOut();
  };

  render() {
    const {
      classes: s,
      data: { me },
    } = this.props;

    const { userMenuEl } = this.state;

    const {
      history: {
        location: { pathname: path },
      },
    } = this.context;

    let index = false;

    if (path === '/') {
      index = 0;
    } else if (path.startsWith('/news')) {
      index = 1;
    } else if (path.startsWith('/submit')) {
      index = 2;
    }

    return (
      <div className={s.container}>
        <LayoutHeader />
        <Paper className={s.body}>
          <div className={s.toolbar}>
            <Tabs value={index} onChange={this.handleChange}>
              <Tab className={s.tab} label="Home" component={Link} href="/" />
              <Tab
                className={s.tab}
                label="News"
                component={Link}
                href="/news"
              />
              <Tab
                className={s.tab}
                label="Submit"
                component={Link}
                href="/submit"
              />
            </Tabs>
            <span className={s.separator} />
            {me ? (
              <>
                <Avatar
                  className={s.avatar}
                  src={me.photoURL}
                  alt={me.displayName}
                  onClick={this.openUserMenu}
                  aria-owns={userMenuEl ? 'user-menu' : null}
                  aria-haspopup="true"
                />
                <Menu
                  id="user-menu"
                  role="menu"
                  anchorEl={userMenuEl}
                  open={Boolean(userMenuEl)}
                  onClose={this.closeUserMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: -56,
                    horizontal: 82,
                  }}
                >
                  <MenuItem
                    component={Link}
                    href={`/@${me.username}`}
                    onClick={this.closeUserMenu}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem id="user-menu-signout" onClick={this.logOut}>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button className={s.login} onClick={this.props.logIn}>
                Sign In
              </Button>
            )}
          </div>
          <div className={s.content}>{this.props.children}</div>
        </Paper>
        <LayoutFooter />
        <AutoUpdater user={me} />
      </div>
    );
  }
}

export default compose(
  withAuth(),
  withStyles(styles, { withTheme: true }),
)(
  createFragmentContainer(
    Layout,
    graphql`
      fragment Layout on Query {
        me {
          ...AutoUpdater_user
          id
          username
          displayName
          photoURL
        }
      }
    `,
  ),
);
