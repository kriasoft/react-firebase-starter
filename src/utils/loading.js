/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

let count = 0;
const listeners = new Set();

let notification;

export default {
  listen(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  notifyStart() {
    if (count++ === 0) {
      notification = setTimeout(() => {
        listeners.forEach(x => x(true /* loading is in progress */));
      }, 200 /* delay start loading notification for 200ms */);
    }
  },
  notifyStop() {
    listeners.forEach(x => x(false /* loading is no longer in progress */));
    if (--count === 0) {
      clearTimeout(notification);
      listeners.forEach(x => x(false /* loading is no longer in progress */));
    }
  },
};
