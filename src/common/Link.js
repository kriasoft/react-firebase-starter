/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { useHistory } from '../hooks';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

type Props = {
  onClick: ?(event: MouseEvent) => void,
};

function Link(props: Props) {
  const history = useHistory();

  function handleClick(event: MouseEvent) {
    if (props.onClick) {
      props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(event.currentTarget.getAttribute('href'));
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} onClick={handleClick} />;
}

export default Link;
