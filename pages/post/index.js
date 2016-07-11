/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';

class PostPage extends React.Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Layout>
        <h1>{this.props.data[0].title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.data[0].html }} />
      </Layout>
    );
  }

}

export default PostPage;
