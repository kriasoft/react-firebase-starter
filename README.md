# React Static Boilerplate &nbsp; <a href="https://travis-ci.org/kriasoft/react-static-boilerplate"><img src="http://img.shields.io/travis/kriasoft/react-static-boilerplate/master.svg?style=flat-square" height="20" /></a> <a href="https://github.com/kriasoft/react-static-boilerplate/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/react-static-boilerplate.svg?style=social&label=Star&maxAge=3600" height="20"></a> <a href="https://twitter.com/ReactStatic"><img src="https://img.shields.io/twitter/follow/ReactStatic.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

[**React Static Boilerplate**](https://github.com/kriasoft/react-static-boilerplate) (RSB) is a
boilerplate and tooling for creating modern stand-alone web applications (aka
[SPA](https://en.wikipedia.org/wiki/Single-page_application)s) for a serverless architecture. RSB
significantly reduces cost by eliminating the need for servers such as EC2 instances because the
entire site can be hosted directly from CDN ([Firebase](https://www.firebase.com/), [GitHub
Pages](https://pages.github.com/), [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html),
or other similar cloud storage). Sites built with RSB can be fully functional with REST API or
GraphQL calls to micro-services such as [Amazon Lambda](https://aws.amazon.com/lambda/),
[Azure Functions](https://azure.microsoft.com/services/functions/), or dynamic Docker endpoints
hosted on [DigitalOcean](https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective).
RSB demonstrates how to use component-based UI development approach with best of breed
technologies including [React](http://facebook.github.io/react/), [Redux](http://redux.js.org/),
[Babel](http://babeljs.io/), [Webpack](https://webpack.github.io/), [Browsersync](https://browsersync.io/),
[React Hot Loader](http://gaearon.github.io/react-hot-loader/) and more. **This work is being
[sponsored](https://opencollective.com/react-static-boilerplate#support) by**:

<p align="center">
  <a href="https://rollbar.com/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)" target="_blank">
    <img src="https://koistya.github.io/files/rollbar-384x64.png" width="192" height="32">
  </a>
  <a href="https://localizejs.com/?cid=802&utm_source=rsk" target="_blank">
    <img src="https://koistya.github.io/files/localize-353x64.png" width="176.5" height="32">
  </a>
  <a href="https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective" target="_blank">
    <img src="https://koistya.github.io/files/digital-ocean-393x64.png" width="196.5" height="32">
  </a>
</p>


### Features

✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/), modern CSS syntax via [PostCSS](https://github.com/postcss/postcss)<br>
✓ Component-based UI architecture via [React](http://facebook.github.io/react/), [Webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)<br>
✓ Application state management /w time-travel debugging via [Redux](http://redux.js.org/) (see [`main.js`](src/main.js), [`store.js`](src/store.js))<br>
✓ Routing and navigation via [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) and [`history`](https://github.com/mjackson/history) ([`main.js`](src/main.js), [`router.js`](src/router.js), [`tools/routes-loader.js`](tools/routes-loader.js))<br>
✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading via [Webpack](https://webpack.github.io/) v2<br>
✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/), cross-device testing with [Browsersync](https://browsersync.io/) (see [`run.js`](tools/run.js))<br>
✓ **24/7** community support on [Gitter](https://gitter.im/kriasoft/react-static-boilerplate) + *perimum support* on [Skype](https://hatscripts.com/addskype?koistya) ([book a session](https://calendly.com/koistya))<br>

**View** [docs](./docs), [online demo](https://rsb.kriasoft.com) &nbsp;|&nbsp; **Follow us** on
[Gitter](https://gitter.im/kriasoft/react-static-boilerplate), [Twitter](https://twitter.com/ReactStatic)
or [ProductHunt](https://www.producthunt.com/tech/react-static-boilerplate) &nbsp;|&nbsp;
**Learn** [React.js and ES6](#learn-reactjs-and-es6)


### Directory Layout

```shell
├── components/                 # Shared or generic UI components
│   ├── Button/                 # Button component
│   ├── Layout/                 # Website layout component
│   ├── Link/                   # Link component to be used instead of <a>
│   └── ...                     # etc.
├── docs/                       # Documentation to the project
├── node_modules/               # 3rd-party libraries and utilities
├── src/                        # Application source code
│   ├── about/                  # About page
│   ├── error/                  # Error page
│   ├── home/                   # Home page
│   ├── history.js              # Handles client-side navigation
│   ├── main.js                 # <== Application entry point <===
│   ├── router.js               # Handles routing and data fetching
│   ├── routes.json             # This list of application routes
│   └── store.js                # Application state manager (Redux)
├── public/                     # Static files such as favicon.ico etc.
│   ├── dist/                   # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── ...                     # etc.
├── test/                       # Unit and integration tests
├── tools/                      # Utility and helper classes
└── package.json                # The list of project dependencies and NPM scripts
```


### Getting Started

**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer and
[Yarn](https://yarnpkg.com/) installed on your development machine.

**Step 2**. Clone this repository (alternatively, use [Yeoman
generator](https://github.com/kriasoft/react-static-boilerplate/tree/generator-react-static) to
bootstrap your project):

```shell
$ git clone -o react-static-boilerplate -b master --single-branch \
      https://github.com/kriasoft/react-static-boilerplate.git MyApp
$ cd MyApp
$ yarn install                  # Install project dependencies listed in package.json
```


**Step 3**. Compile and launch your app by running:

```shell
$ yarn start                    # Compiles the app and opens it in a browser with "live reload"
```

You can also test your app in release (production) mode by running `yarn start -- --release` or
with HMR and React Hot Loader disabled by running `yarn start -- --no-hmr`. The app should become
available at [http://localhost:3000/](http://localhost:3000/).


### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ yarn lint                     # Check JavaScript and CSS code for potential issues
$ yarn test                     # Run unit tests. Or, `yarn run test:watch`
```


### How to Deploy

Update `publish` script in the [`tools/publish.js`](tools/publish.js) file with your full Firebase
project name as found in your [Firebase console](https://console.firebase.google.com/). Note that
this may have an additional identifier suffix than the shorter name you've provided. Then run: 

```shell
$ yarn publish                  # Builds and deployes the app to Firebase
```

The first time you publish, you will be prompted to authenticate with Google and generate an
authentication token in order for the publish script to continue.

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)

If you need to build the project without publishing it, simply run:

```shell
$ yarn build                    # Compiles the app into the /public/dist folder
```


### How to Update

You can always fetch and merge the recent changes from this repo back into your own project:

```shell
$ git checkout master
$ git fetch react-static-boilerplate
$ git merge react-static-boilerplate/master
$ yarn install
```


### Learn React.js and ES6

:mortar_board: &nbsp; **[React.js Training Program](http://www.reactjsprogram.com/?asdf=36750_q0pu0tfa)** by Tyler McGinnis<br>
:mortar_board: &nbsp; **[React for Beginners](https://reactforbeginners.com/friend/konstantin)** and **[ES6 Training Course](https://es6.io/friend/konstantin)** by Wes Bos<br>
:green_book: &nbsp; **[React: Up & Running: Building Web Applications](http://amzn.to/2bBgqhl)** by Stoyan Stefanov (Aug, 2016)<br>
:green_book: &nbsp; **[Getting Started with React](http://amzn.to/2bmwP5V)** by Doel Sengupta and Manu Singhal (Apr, 2016)<br>
:green_book: &nbsp; **[You Don't Know JS: ES6 & Beyond](http://amzn.to/2bBfVnp)** by Kyle Simpson (Dec, 2015)<br>


### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js, React, GraphQL, Webpack, CSS Modules)
* [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter) — Boilerplate and tooling for building data APIs with Node.js, GraphQL and Relay
* [ASP.NET Core Starter Kit](https://github.com/kriasoft/aspnet-starter-kit) — Cross-platform single-page application boilerplate (ASP.NET Core, React, Redux)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup, Mocha, Chai, Sinon, Rewire)
* [React App SDK](https://github.com/kriasoft/react-app) — Create React apps with just a single dev dependency and zero configuration
* [Universal Router](https://github.com/kriasoft/universal-router) — Isomorphic router for web and single-page applications (SPA)
* [History](https://github.com/mjackson/history) — HTML5 History API wrapper library that handle navigation in single-page apps


### How to Contribute

Anyone and everyone is welcome to [contribute](CONTRIBUTING.md) to this project. The best way to
start is by checking our [open issues](https://github.com/kriasoft/react-static-boilerplate/issues),
[submit a new issues](https://github.com/kriasoft/react-static-boilerplate/issues/new?labels=bug) or
[feature request](https://github.com/kriasoft/react-static-boilerplate/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike, send [pull
requests](CONTRIBUTING.md#pull-requests).


### License

Copyright © 2015-present Kriasoft, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt) file.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/react-static-boilerplate/graphs/contributors)
