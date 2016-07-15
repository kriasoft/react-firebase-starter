'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _yeomanGenerator.Base.extend({
  prompting: function prompting() {
    // Have Yeoman greet the user.
    this.log((0, _yosay2.default)('Welcome to the amazing ' + _chalk2.default.red('React Static') + ' generator!'));

    // const prompts = [{
    //   type: 'confirm',
    //   name: 'someAnswer',
    //   message: 'Would you like to enable this option?',
    //   default: true,
    // }];

    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;
    // });
  },
  writing: function writing() {
    this.fs.copy(this.templatePath('**/*'), this.destinationRoot(), {
      globOptions: {
        dot: true,
        ignore: ['**/.git', '**/.npmignore', '**/CONTRIBUTING.md']
      }
    });
  },
  install: function install() {
    this.installDependencies();
  }
}); /**
     * Yeoman Generator Starter Kit
     *
     * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
//# sourceMappingURL=index.js.map