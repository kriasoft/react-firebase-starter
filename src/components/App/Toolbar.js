/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiToolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton/IconButton';
import Avatar from 'material-ui/Avatar/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import styled from 'styled-components';

import auth from '../../auth';
import history from '../../history';
import Link from '../../components/Link';
import LoginDialog from './LoginDialog';

const Title = styled(Typography)`
  && {
    flex: 1;
    text-align: left;
    cursor: pointer;
  }
`;

function goHome() {
  history.push('/');
}

class Toolbar extends React.Component<{}, {}> {
  state = {
    loginOpen: false,
    accountMenuOpen: false,
    accountMenuAnchor: null,
  };

  componentDidMount() {
    this.unlisten = auth.onShowLoginDialog(this.showLoginDialog);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  showLoginDialog = event => {
    this.setState({ loginDialogOpen: true });
  };

  hideLogin = () => {
    this.setState({ loginDialogOpen: false });
  };

  handleAccountMenuOpen = event => {
    this.setState({ accountMenuAnchor: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    this.setState({ accountMenuAnchor: null });
  };

  goToAccount = () => {
    this.setState({ accountMenuAnchor: null });
    history.push('/account');
  };

  render() {
    const accountMenuOpen = Boolean(this.state.accountMenuAnchor);

    return (
      <AppBar color="default" position="static">
        <MuiToolbar>
          <Title type="title" color="inherit" onClick={goHome}>
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
              <Button color="inherit" href="/about" onClick={Link.handleClick}>
                About Us
              </Button>
              <Button color="inherit" onClick={auth.showLoginDialog}>
                Sign In
              </Button>
            </React.Fragment>
          )}
        </MuiToolbar>
        <LoginDialog
          open={this.state.loginDialogOpen}
          onClose={this.hideLogin}
        />
      </AppBar>
    );
  }
}

export default Toolbar;
