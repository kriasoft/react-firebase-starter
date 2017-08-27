/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

if (
  process.argv.indexOf('--pre-render') !== -1 ||
  process.argv.indexOf('--prerender') !== -1
) {
  require('pre-render')('./build', ['/', '/about']);
}
