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
    to: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    href: PropTypes.string,
    className: PropTypes.string,
    colored: PropTypes.bool,
    primary: PropTypes.bool,
    accent: PropTypes.bool,
    ripple: PropTypes.bool,
    children: PropTypes.node,
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
      component || (to ? Link : (href ? 'a' : 'button')), // eslint-disable-line no-nested-ternary
      {
        ref: node => (this.root = node),
        className: cx(
          'mdl-button mdl-js-button',
          type && `mdl-button--${type}`,
          {
            'mdl-button--colored': colored,
            'mdl-button--primary': primary,
            'mdl-button--accent': accent,
            'mdl-js-ripple-effect': ripple,
          },
          className,
        ),
        to,
        href,
        ...other,
      },
      children,
    );
  }

}

export default Button;
