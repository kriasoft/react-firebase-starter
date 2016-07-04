# React Static Boilerplate &nbsp; [![Build Status](http://img.shields.io/travis/kriasoft/react-static-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/react-static-boilerplate) [![To-do](https://img.shields.io/waffle/label/kriasoft/react-static-boilerplate/to-do.svg?style=flat-square)](https://waffle.io/kriasoft/react-static-boilerplate) [![Online Chat](http://img.shields.io/badge/chat_room-%23react--static--boilerplate-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-static-boilerplate)

> [**React Static Boilerplate**](https://github.com/kriasoft/react-static-boilerplate) (RSB) is an
> opinionated boilerplate and tooling for creating modern stand-alone web applications (aka
> [SPA](https://en.wikipedia.org/wiki/Single-page_application)s) for a serverless architecture. RSB
> significantly reduces cost by eliminating the need for servers such as EC2 instances because the
> entire site can be hosted directly from CDN ([Firebase](https://www.firebase.com/), [GitHub
> Pages](https://pages.github.com/), [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html),
> or other similar cloud storage). Sites built with RSB cab be fully functional with REST API or
> GraphQL calls to micro-services such as [Amazon Lambda](https://aws.amazon.com/lambda/),
> [Azure Functions](https://azure.microsoft.com/services/functions/), or dynamic Docker endpoints
> hosted on [DigitalOcean](https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective).
> RSB demonstrates how to use component-based UI development approach with best of breed
> technologies including [React](http://facebook.github.io/react/), [Redux](http://redux.js.org/),
> [Babel](http://babeljs.io/), [Webpack](https://webpack.github.io/), [Browsersync](https://browsersync.io/),
> [React Hot Loader](http://gaearon.github.io/react-hot-loader/) and more.

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
&nbsp; &nbsp; ✓ **24/7** community support on [Gitter](https://gitter.im/kriasoft/react-static-boilerplate); customization requests on [Codementor](https://www.codementor.io/koistya)<br>

**Demo**: https://rsb.kriasoft.com &nbsp;|&nbsp; **View** [docs](./docs) &nbsp;|&nbsp; **Follow us** on
[Gitter](https://gitter.im/kriasoft/react-static-boilerplate), [Twitter](https://twitter.com/ReactStatic),
or [ProductHunt](https://www.producthunt.com/tech/react-static-boilerplate) &nbsp;|&nbsp;
**Send feedback** to [@koistya](https://twitter.com/koistya)


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
      https://github.com/kriasoft/react-static-boilerplate.git MyApp
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

Update `publish` script in the [`run.js`](run.js) file with your full Firebase project name as found in your [Firebase console](https://console.firebase.google.com/). Note that this may have an additional identifier suffix than the shorter name you've provided. Then run: 

```shell
$ node run publish              # Build and publish the website to Firebase, same as `npm run publish`
```

The first time you publish, you will be prompted to authenticate with Google and generate an authentication token in order for the publish script to continue.

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)

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


### How to Contribute

Anyone and everyone is welcome to [contribute](CONTRIBUTING.md) to this project. The best way to
start is by checking our [open issues](https://github.com/kriasoft/react-static-boilerplate/issues),
[submit a new issues](https://github.com/kriasoft/react-static-boilerplate/issues/new?labels=bug) or
[feature request](https://github.com/kriasoft/react-static-boilerplate/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike, send [pull
requests](CONTRIBUTING.md#pull-requests).


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

Copyright © 2015-present Kriasoft, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt) file.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/react-static-boilerplate/graphs/contributors)
