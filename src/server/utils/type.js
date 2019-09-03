/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

export function assignType(type) {
  return obj => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    if (obj) obj.__type = type;
    return obj;
  };
}

export function getType(obj) {
  // eslint-disable-next-line no-underscore-dangle
  return obj ? obj.__type : undefined;
}
