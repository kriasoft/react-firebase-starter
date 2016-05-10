import React, { Component, PropTypes } from 'react';

function withStyles(BaseComponent, ...styles) {
  return class StyledComponent extends Component {
    static contextTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    componentWillMount() {
      this.removeCss = this.context.insertCss.apply(undefined, styles);
    }

    componentWillUnmount() {
      setTimeout(this.removeCss, 0);
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  };
}

export default withStyles;
