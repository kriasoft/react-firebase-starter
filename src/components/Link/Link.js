/**
 * React Starter Kit for Firebase and GraphQL
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

import history from '../../history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

type Props = {
  onClick: ?(event: MouseEvent) => void,
};

class Link extends React.Component<Props> {
  static propTypes = {
    onClick: PropTypes.func,
  };

  _handleClick = (event: MouseEvent) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    Link.handleClick(event);
  };

  static handleClick(event: MouseEvent) {
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(event.currentTarget.getAttribute('href'));
  }

  render() {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...this.props} onClick={this._handleClick} />;
  }
}

export default Link;
