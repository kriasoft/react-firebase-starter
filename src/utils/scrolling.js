/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { canUseDOM } from './env';

const listeners = new Set();
const scrollPositions = new Map();

let last_known_scroll_position = 0;
let ticking = false;

let history;

if (canUseDOM) {
  window.addEventListener('scroll', () => {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (history) {
          scrollPositions.set(history.location.key, last_known_scroll_position);
        }
        listeners.forEach(cb => cb(last_known_scroll_position));
        ticking = false;
      });
      ticking = true;
    }
  });
}

export function onScroll(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setHistory(browserHistory) {
  history = browserHistory;
}

export function getScrollPosition(locationKey) {
  return scrollPositions.get(locationKey);
}
