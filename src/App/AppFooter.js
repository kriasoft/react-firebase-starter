/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import s from './AppFooter.css';

const KRIASOFT_URL = 'https://www.kriasoft.com/';
const LICENSE_URL =
  'https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt';

class AppFooter extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <span className={s.copyright}>&copy; 2015-present</span>
        <a className={s.link} href={KRIASOFT_URL}>
          Kriasoft
        </a>
        <span className={s.separator}>|</span>
        <a className={s.link} href={LICENSE_URL}>
          MIT License
        </a>
      </div>
    );
  }
}

export default AppFooter;
