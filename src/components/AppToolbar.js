/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import MuiToolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton/IconButton';
import Avatar from 'material-ui/Avatar/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import styled from 'styled-components';

import auth from '../auth';
import Link from './Link';

const Title = styled(Typography)`
  && {
    flex: 1;
    text-align: left;
    cursor: pointer;
  }
`;

class AppToolbar extends React.Component<{}, {}> {
  static contextTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    loginOpen: false,
    accountMenuOpen: false,
    accountMenuAnchor: null,
  };

  componentDidMount() {
    this.unlisten = auth.onShowLoginDialog(() => {
      this.context.history.push('/login');
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  goHome = () => {
    this.context.history.push('/');
  };

  handleAccountMenuOpen = event => {
    this.setState({ accountMenuAnchor: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    this.setState({ accountMenuAnchor: null });
  };

  goToAccount = () => {
    this.setState({ accountMenuAnchor: null });
    this.context.history.push('/account');
  };

  render() {
    const accountMenuOpen = Boolean(this.state.accountMenuAnchor);

    return (
      <AppBar color="inherit" position="static">
        <MuiToolbar>
          <Title type="title" color="inherit" onClick={this.goHome}>
            My App
          </Title>
          {this.props.user && (
            <React.Fragment>
              <IconButton onClick={this.handleAccountMenuOpen}>
                <Avatar src={this.props.user.photoURL} />
              </IconButton>
              <Menu
                anchorEl={this.state.accountMenuAnchor}
                open={accountMenuOpen}
                onClose={this.handleAccountMenuClose}
              >
                <MenuItem onClick={this.goToAccount}>My Account</MenuItem>
                <MenuItem onClick={auth.signOut}>Sign Out</MenuItem>
              </Menu>
            </React.Fragment>
          )}
          {this.props.user === null && (
            <React.Fragment>
              <Button color="inherit" href="/about" component={Link}>
                About Us
              </Button>
              <Button color="inherit" onClick={auth.showLoginDialog}>
                Sign In
              </Button>
            </React.Fragment>
          )}
        </MuiToolbar>
      </AppBar>
    );
  }
}

export default AppToolbar;
