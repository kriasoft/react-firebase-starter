/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

// https://material-ui.com/customization/themes/
// https://material-ui.com/style/color/
export default createMuiTheme({
  palette: {
    primary: indigo,
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});
