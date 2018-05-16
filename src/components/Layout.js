/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';

import theme from '../theme';
import Link from './Link';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import withAuth from '../utils/withAuth';

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
  margin-top: -48px;
  margin-right: auto;
  margin-left: auto;

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
    width: 32px;
    height: 32px;
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
                <SignInButton onClick={this.props.logIn}>Sign In</SignInButton>
              )}
            </StyledTabs>
            <Content>{this.props.children}</Content>
          </Body>
          <LayoutFooter />
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default withAuth()(
  createFragmentContainer(
    Layout,
    graphql`
      fragment Layout on Query {
        me {
          id
          username
          displayName
          photoURL
        }
      }
    `,
  ),
);
