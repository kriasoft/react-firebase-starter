/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */
/* eslint-disable import/no-webpack-loader-syntax */

import ejs from 'ejs';

import ok from '!!raw-loader!./ok.ejs';
import error from '!!raw-loader!./error.ejs';
import dataModel from '!!raw-loader!./data-model.ejs';

export default {
  ok: ejs.compile(ok),
  error: ejs.compile(error),
  dataModel: ejs.compile(dataModel),
};
