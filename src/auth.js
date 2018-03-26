/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

const callbacks = new Set();

class WindowPromise {
  constructor(uri, config = {}) {
    const { width, height, ...rest } = config;

    this.uri = uri;
    this.width = width || 600;
    this.height = height || 680;
    this.config = rest;
  }

  getWindowFeatures = () => {
    const [width, height] = [this.width, this.height];
    const { screenLeft, screenTop, innerWidth, innerHeight, screen } = window;
    const html = window.document.documentElement;

    const dualScreenLeft = screenLeft !== undefined ? screenLeft : screen.left;
    const dualScreenTop = screenTop !== undefined ? screenTop : screen.top;
    const w = innerWidth || html.clientWidth || screen.width;
    const h = innerHeight || html.clientHeight || screen.height;

    const config = {
      width,
      height,
      left: w / 2 - width / 2 + dualScreenLeft,
      top: h / 2 - height / 2 + dualScreenTop,
    };

    return Object.keys(config)
      .map(key => key + '=' + config[key])
      .join(',');
  };

  open = uri => {
    this._window = window.open(uri || this.uri, null, this.getWindowFeatures());
    window.addEventListener('message', this.onPostMessage, true);

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  };

  close = () => {
    window.removeEventListener('message', this.onPostMessage);
    this._window.close();
  };

  onPostMessage = event => {
    if (event.data.error) {
      this.reject(event.data.error);
    } else {
      this.resolve(event.data);
      this.close();
    }
  };
}

const windowPromise = new WindowPromise();

export default {
  showLoginDialog() {
    windowPromise.open('/login').then(() => {
      callbacks.forEach(callback => callback());
    });
  },

  signOut() {
    return fetch('/login/clear', { method: 'POST', credentials: 'include' });
  },

  onShowLoginDialog(callback: () => void) {
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  },

  onAuthStateChanged(callback: any => void) {
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  },
};
