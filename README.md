# React Static Boilerplate

[![NPM version](http://img.shields.io/npm/v/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![NPM downloads](http://img.shields.io/npm/dm/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![Build Status](http://img.shields.io/travis/koistya/react-static-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/koistya/react-static-boilerplate)
[![Dependency Status](http://img.shields.io/david/koistya/react-static-boilerplate.svg?branch=master&style=flat-square)](https://david-dm.org/koistya/react-static-boilerplate)
[![GitHub Issues](https://img.shields.io/github/issues/koistya/react-static-boilerplate.svg?style=flat-square)](https://github.com/koistya/react-static-boilerplate/issues?q=is:open)
[![To-do](https://img.shields.io/waffle/label/koistya/react-static-boilerplate/to-do.svg?style=flat-square)](https://waffle.io/koistya/react-static-boilerplate)
[![In progress](https://img.shields.io/waffle/label/koistya/react-static-boilerplate/in%20progress.svg?style=flat-square)](https://waffle.io/koistya/react-static-boilerplate)

> Single-page application boilerplate and tooling powered by [React](http://facebook.github.io/react/)
> and [Redux](http://redux.js.org/). It's optimized for generating a static website from React components
> ready to be deployed to [Firebase](https://firebase.google.com/) CDN hosting.

**The work is being sponsored by:**

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


### Features

&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/), modern CSS syntax via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Component-based UI architecture via [React](http://facebook.github.io/react/), [Webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ Application state management /w time-travel debugging via [Redux](http://redux.js.org/) (see [`main.js`](main.js), [`core/store.js`](core/store.js))<br>
&nbsp; &nbsp; ✓ Routing and navigation via [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) and [`history`](https://github.com/mjackson/history) (see [`main.js`](main.js), [`core/router.js`](core/router.js), [`utils/routes-loader.js`](utils/routes-loader.js))<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading via [Webpack](https://webpack.github.io/) and [ES6 System.import()](http://www.2ality.com/2014/09/es6-modules-final.html)<br>
&nbsp; &nbsp; ✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/) (see [`run.js#start`](run.js))<br>
&nbsp; &nbsp; ✓ 24/7 community support on [Gitter](https://gitter.im/koistya/react-static-boilerplate); customization requests on [Codementor](https://www.codementor.io/koistya)<br>


### Directory Layout

```shell
.
├── /components/                # Shared or generic UI components
│   ├── /Button/                # Button component
│   ├── /Layout/                # Website layout component
│   ├── /Link  /                # Link component to be used insted of <a>
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js               # Application state manager (Redux)
├── /node_modules/              # 3rd-party libraries and utilities
├── /pages/                     # React components for web pages
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /utils/                     # Utility and helper classes
│── index.html                  # HTML page that references application bundle
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── routes.json                 # This list of application routes
│── run.js                      # Build automation script, e.g. `node run build`
└── webpack.config.js           # Bundling and optimization settings for Webpack
```


### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```shell
$ git clone -o react-static-boilerplate -b master --single-branch \
      https://github.com/koistya/react-static-boilerplate.git MyApp
$ cd MyApp
$ npm install                   # Install project dependencies listed in package.json
$ node run                      # Build and launch the app, same as `npm start`
```

**NODE**: Make sure that you have [Node.js](https://nodejs.org/) v6 installed on your local machine.


### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ npm run lint                  # Check JavaScript and CSS code for potential issues
$ npm run test                  # Run unit tests. Or, `npm run test:watch`
```


### How to Deploy

Update deployment URL inside `run.js#publish` file, the run one of the following commands: 

```shell
$ node run publish              # Build and publish the website to Firebase, same as `npm run publish`
```

If you need just to build the project without publishing it, run:

```shell
$ node run build                # Or, `node run build --release` for production build
```


### How to Update

You can always fetch and merge the recent changes from this repo back into your own project:

```shell
$ git checkout master
$ git fetch react-static-boilerplate
$ git merge react-static-boilerplate/master
$ npm install
```


### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js, React, GraphQL, Webpack, CSS Modules)
* [ASP.NET Core Starter Kit](https://github.com/kriasoft/aspnet-starter-kit) — Cross-platform single-page application boilerplate (ASP.NET Core, React, Redux)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup, Mocha, Chai, Sinon, Rewire)
* [Universal Router](https://github.com/kriasoft/universal-router) — Isomorphic router for web and single-page applications (SPA)
* [History](https://github.com/mjackson/history) — HTML5 History API wrapper library that handle navigation in single-page apps


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
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/koistya/react-static-boilerplate/graphs/contributors)
