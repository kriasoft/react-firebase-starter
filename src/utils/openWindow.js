/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

function getWindowFeataures(options = {}) {
  const width = options.width || 600;
  const height = options.height || 600;
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
    .map(key => `${key}=${config[key]}`)
    .join(',');
}

export function openWindow(uri, { onPostMessage, ...options } = {}) {
  const win = window.open(uri, null, getWindowFeataures(options));

  let executor;

  const onResolve = data => {
    window.removeEventListener('message', onPostMessageWrapper);

    if (executor) {
      win.close();
      executor.resolve(data);
      executor = null;
    }
  };

  const onPostMessageWrapper = event => {
    if (onPostMessage) {
      const result = onPostMessage(event);
      if (result) onResolve(result);
    }
  };

  window.addEventListener('message', onPostMessageWrapper, true);

  return new Promise(resolve => {
    executor = { resolve };
  });
}
