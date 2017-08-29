/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

const primerConfig = require('stylelint-config-primer');

// stylelint configuration
// https://stylelint.io/user-guide/configuration/
module.exports = {
  // https://github.com/styled-components/stylelint-processor-styled-components
  processors: ['stylelint-processor-styled-components'],

  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components-processor',
  ],

  syntax: 'scss',

  plugins: [
    // stylelint plugin to sort CSS rules content with specified order
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order',
  ],

  rules: {
    'at-rule-empty-line-before': null,
    'block-opening-brace-space-after': null,
    'block-closing-brace-space-before': null,

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],

    'string-quotes': 'single',

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': primerConfig.rules['order/properties-order'],
  },
};
