/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Link from '../Link';

class Button extends React.Component {

  static propTypes = {
    component: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
    ]),
    type: PropTypes.oneOf(['raised', 'fab', 'mini-fab', 'icon']),
    className: PropTypes.string,
    colored: PropTypes.bool,
    primary: PropTypes.bool,
    accent: PropTypes.bool,
    ripple: PropTypes.bool,
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const { component, type, className, colored, to, href,
      primary, accent, ripple, children, ...other } = this.props;
    return React.createElement(
      component || (to ? Link : (href ? 'a' : 'button')),
      {
        ref: node => (this.root = node),
        className: cx(
          'mdl-button mdl-js-button',
          type && `mdl-button--${type}`,
          {
            'mdl-button--colored': colored,
            'mdl-button--primary': primary,
            'mdl-button--accent': accent,
            'mdl-button--ripple': ripple,
          },
          this.props.className
        ),
        ...other,
      },
      children
    );
  }

}

export default Button;
