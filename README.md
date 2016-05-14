# React Static Boilerplate

[![NPM version](http://img.shields.io/npm/v/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![NPM downloads](http://img.shields.io/npm/dm/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![Build Status](http://img.shields.io/travis/koistya/react-static-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/koistya/react-static-boilerplate)
[![Dependency Status](http://img.shields.io/david/koistya/react-static-boilerplate.svg?branch=master&style=flat-square)](https://david-dm.org/koistya/react-static-boilerplate)
[![Sponsors](https://opencollective.com/react-static-boilerplate/badge/sponsors.svg?style=flat-square)](https://opencollective.com/react-static-boilerplate#support)
[![Chat](https://img.shields.io/badge/chat-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/koistya/react-static-boilerplate)

> Static website starter kit powered by [React.js](http://facebook.github.io/react/) and [Webpack](http://webpack.github.io/)


### Features

&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/)<br>
&nbsp; &nbsp; ✓ Modern CSS syntax (CSS3+) via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Application state management via [Redux](http://redux.js.org/)<br>
&nbsp; &nbsp; ✓ Routing and navigation via [Universal Router](https://github.com/kriasoft/universal-router)<br>
&nbsp; &nbsp; ✓ Modular styles via [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>
&nbsp; &nbsp; ✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](https://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/)<br>
&nbsp; &nbsp; ✓ Easy deployment to [GitHub Pages](https://pages.github.com/), [Amazon S3](http://davidwalsh.name/hosting-website-amazon-s3) or [Firebase](https://www.firebase.com/)<br>
&nbsp; &nbsp; ✓ Minimum dependencies (no Gulp/Grunt)<br>
&nbsp; &nbsp; ✓ [Yeoman](http://yeoman.io/) generator ([generator-react-static](https://www.npmjs.com/package/generator-react-static))<br>
&nbsp; &nbsp; ✓ 24/7 community support on [Gitter](https://gitter.im/koistya/react-static-boilerplate) or [StackOverflow](http://stackoverflow.com/questions/tagged/react-starter-kit)<br>
&nbsp; &nbsp; ✓ Customization requests on [Codementor](https://www.codementor.io/koistya)<br>


### Sponsors

<a href="https://opencollective.com/react-static-boilerplate/sponsor/0/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/sponsor/0/avatar.svg" height="64">
</a> &nbsp;
<a href="https://opencollective.com/react-static-boilerplate/sponsor/1/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/sponsor/1/avatar.svg" height="64">
</a> &nbsp;
<a href="https://opencollective.com/react-static-boilerplate/sponsor/2/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/sponsor/2/avatar.svg" height="64">
</a> &nbsp;
<a href="https://opencollective.com/react-static-boilerplate/sponsor/3/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/sponsor/3/avatar.svg" height="64">
</a> &nbsp;
<a href="https://opencollective.com/react-static-boilerplate/sponsor/4/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/sponsor/4/avatar.svg" height="64">
</a>


### Directory Layout


```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /components/                # Shared/generic UI components
│   ├── /layout/                # Layout component
│   ├── /button/                # Button component
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /app.js                 # Application entry point (bootstrap)
│   ├── /store.js               # Application state manager (Redux)
│   └── /...                    # etc.
├── /routes/                    # View/screen UI components + routing information
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /static/                    # Static files such as favicon.ico etc.
├── /test/                      # Unit and integration tests
├── /tools/                     # Build automation scripts and utilities
│── LICENSE.txt                 # Licensing information
│── package.json                # The list of project dependencies and NPM scripts
└── README.md                   # Project overview / getting started guide
```


### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```
$ git clone -o react-static-boilerplate -b master --single-branch \
      https://github.com/koistya/react-static-boilerplate.git MyApp
$ cd MyApp
$ npm install           # Install project dependencies listed in package.json
$ npm start             # Build and launch the app, same as "node tools/start.js"
```

**NODE**: Make sure that you have [Node.js](https://nodejs.org/) v6 installed on your local machine.

### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```
$ npm test
```


### How to Deploy

```shell
$ npm run deploy                # Deploys the project to GitHub Pages
```

Alternatively, you can build a production release to manually deploy to S3, Firebase, Netlify, and other static hosts. Simply run the command below and copy the generated `build` folder to your static host.

```shell
$ npm run build release         # Build production release 
```


### How to Update

You can always fetch and merge the recent changes from this repo back into your own project:

```shell
$ git checkout master
$ git fetch react-static-boilerplate
$ git merge react-static-boilerplate/master
$ npm install
```


### Backers

Love **React Static Boilerplate** work and community? Help us keep it alive by [donating funds](https://opencollective.com/react-static-boilerplate#support) to cover project expenses!

<a href="https://opencollective.com/react-static-boilerplate/backer/0/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/0/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/1/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/1/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/2/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/2/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/3/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/3/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/4/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/4/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/5/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/5/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/6/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/6/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/7/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/7/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/8/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/8/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/9/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/9/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/10/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/10/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/11/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/11/avatar.svg" height="64">
</a>
<a href="https://opencollective.com/react-static-boilerplate/backer/12/website" target="_blank">
  <img src="https://opencollective.com/react-static-boilerplate/backer/12/avatar.svg" height="64">
</a>


### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js, React, GraphQL, Webpack, CSS Modules)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup, Mocha, Chai, Sinon, Rewire)
* [Universal Router](https://github.com/kriasoft/universal-router) — Isomorphic router for web and single-page applications (SPA)
* [Membership Database](https://github.com/membership/membership.db) — SQL schema boilerplate for user accounts, roles and auth tokens


### Learn More

* [Getting Started with React.js](http://facebook.github.io/react/)
* [Getting Started with GraphQL and Relay](https://quip.com/oLxzA1gTsJsE)
* [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
* [React.js Discussion Board](https://discuss.reactjs.org/)
* [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)


### License

Copyright © 2015-2016 Konstantin Tarkus. This source code is licensed under the MIT license found in the
[LICENSE.txt](https://github.com/koistya/react-static-boilerplate/blob/master/LICENSE.txt) file.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/koistya/react-static-boilerplate/graphs/contributors) &nbsp;|&nbsp; MIT License
