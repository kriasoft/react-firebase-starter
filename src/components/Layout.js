/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import styled, { injectGlobal } from 'styled-components';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MuiThemeProvider } from 'material-ui/styles';
import { graphql, createFragmentContainer } from 'react-relay';

import auth from '../auth';
import theme from '../theme';
import Link from './Link';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import LoginDialog from './LoginDialog';
import SignInMutation from './SignInMutation';
import SignOutMutation from './SignOutMutation';

injectGlobal`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }
`;

const Container = styled.div`
  height: 100vh;
  background: #f9f9f9;
`;

const Body = styled(Paper)`
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -48px;

  && {
    background: transparent;
  }
`;

const Content = styled.div`
  padding: 1em;
  background: #fff;
`;

const StyledTabs = styled(Tabs)`
  background: rgba(255, 255, 255, 0.9);
`;

const StyledTab = styled(Tab)`
  && {
    min-width: inherit;
  }
`;

const Separator = styled.span`
  flex-grow: 1;
`;

const UserPhoto = styled(Avatar)`
  && {
    height: 32px;
    width: 32px;
    margin: 8px 10px;
    cursor: pointer;
  }
`;

const SignInButton = styled(Button)`
  && {
    text-transform: none;
    border-radius: 0;
  }
`;

class Layout extends React.Component {
  static contextTypes = {
    relay: RelayPropTypes.Relay,
    history: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
  };

  state = {
    loginDialogOpen: false,
    userMenuEl: null,
  };

  componentDidMount() {
    const { reset, relay: { environment } } = this.context;
    this.unlisten = auth.onShowLoginDialog(() =>
      this.setState({ loginDialogOpen: true }),
    );
    auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(token => {
          SignInMutation.commit(environment, { token }).then(reset);
        });
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  closeLoginDialog = () => this.setState({ loginDialogOpen: false });

  openUserMenu = event => {
    this.setState({ userMenuEl: event.currentTarget });
  };

  closeUserMenu = event => {
    const { reset, relay: { environment } } = this.context;
    this.setState({ userMenuEl: null });
    if (event.currentTarget.id === 'user-menu-signout') {
      Promise.all([auth.signOut(), SignOutMutation.commit(environment)]).then(
        reset,
      );
    }
  };

  render() {
    const { data: { me } } = this.props;
    const { userMenuEl } = this.state;
    const { history: { location: { pathname: path } } } = this.context;
    const index = path === '/' ? 0 : path.startsWith('/news') ? 1 : 2;

    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <LayoutHeader />
          <Body>
            <StyledTabs value={index} onChange={this.handleChange}>
              <StyledTab label="Home" component={Link} href="/" />
              <StyledTab label="News" component={Link} href="/news" />
              <StyledTab label="Submit" component={Link} href="/submit" />
              <Separator />
              {me ? (
                <>
                  <UserPhoto
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
                      id="user-menu-signout"
                      onClick={this.closeUserMenu}
                    >
                      Sign Out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <SignInButton onClick={auth.showLoginDialog}>
                  Sign In
                </SignInButton>
              )}
            </StyledTabs>
            <Content>{this.props.children}</Content>
          </Body>
          <LayoutFooter />
          <LoginDialog
            open={this.state.loginDialogOpen}
            onClose={this.closeLoginDialog}
          />
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default createFragmentContainer(
  Layout,
  graphql`
    fragment Layout on Query {
      me {
        id
        displayName
        photoURL
      }
    }
  `,
);
