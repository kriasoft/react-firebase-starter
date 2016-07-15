/**
 * Yeoman Generator Starter Kit
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator:app', () => {

  before(() => helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({ someAnswer: true })
    .toPromise()
  );

  it('creates files', () => {
    assert.file([
      'components/Layout/Layout.js',
      'components/Layout/package.json',
      'components/Link/Link.js',
      'components/Link/package.json',
      'core/history.js',
      'docs/recipes/deploy-to-amazon-s3.md',
      'docs/recipes/deploy-to-github-pages.md',
      'docs/README.md',
      'docs/routing-and-navigation.md',
      'pages/home/index.js',
      'pages/home/index.md',
      'public/apple-touch-icon.png',
      'public/crossdomain.xml',
      'public/favicon.ico',
      'public/humans.txt',
      'public/index.ejs',
      'public/robots.txt',
      'public/sitemap.ejs',
      'public/tile.png',
      'public/tile-wide.png',
      'test/.eslintrc',
      'test/spec.js',
      'utils/markdown-loader.js',
      'utils/routes-loader.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.travis.yml',
      'database.rules.json',
      'firebase.json',
      'LICENSE.txt',
      'main.js',
      'package.json',
      'README.md',
      'routes.json',
      'run.js',
      'webpack.config.js',
    ]);

    assert.noFile([
      'CONTRIBUTING.md',
    ]);
  });

});
