/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

module.exports = {
  babel(config, { target }) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        require.resolve('babel-plugin-relay'),
        require.resolve('babel-plugin-lodash'),
      ],
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
