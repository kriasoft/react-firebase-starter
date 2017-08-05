/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

 /* @flow */

import React from 'react';
import s from './AppFooter.css';

class AppFooter extends React.Component {
  render() {
    return (
      <div className={s.root}>
        &copy; 2015-present <a href="https://www.kriasoft.com">Kriasoft</a> |
        <a href="https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt">MIT License</a>
      </div>
    );
  }
}

export default AppFooter;
