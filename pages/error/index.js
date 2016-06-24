/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';

class ErrorPage extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
  };

  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error';
  }

  render() {
    let title = 'Error';
    let message = 'Oups, something went wrong!';
    let stackTrace = this.props.error && this.props.error.stack;

    if (this.props.error && this.props.error.status === 404) {
      title = 'Page Not Found';
      message = 'This page does not exist.';
      stackTrace = null;
    }

    return (
      <Layout>
        <h1>{title}</h1>
        <p>{message}</p>
        {stackTrace && <pre>{stackTrace}</pre>}
      </Layout>
    );
  }

}

export default ErrorPage;
