/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const Logout = React.forwardRef(function Logout(props, ref) {
  const { size = 24, ...other } = props;
  return (
    <SvgIcon
      ref={ref}
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...other}
    >
      <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
    </SvgIcon>
  );
});

export default Logout;
