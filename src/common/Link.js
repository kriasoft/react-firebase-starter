/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from '../hooks';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const Link = React.forwardRef(function Link(props, ref) {
  const { state, ...other } = props;
  const history = useHistory();

  function handleClick(event) {
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
    history.push(event.currentTarget.getAttribute('href'), state);
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a ref={ref} {...other} onClick={handleClick} />;
});

Link.propTypes = {
  state: PropTypes.instanceOf(Object),
  onClick: PropTypes.func,
};

export default Link;
