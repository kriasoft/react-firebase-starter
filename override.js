/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

const relayPlugin = require.resolve('babel-plugin-relay');

module.exports = {
  babel(config, { target }) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        !config.plugins.some(x => x === relayPlugin) &&
          require.resolve('babel-plugin-relay'),
      ].filter(Boolean),
    };
  },

  webpack(config, { target }) {
    if (target === 'node') {
      return config;
    }

    if (target === 'browser') {
      return config;
    }

    return config;
  },
};
