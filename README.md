# React Static Boilerplate

[![NPM version](http://img.shields.io/npm/v/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![NPM downloads](http://img.shields.io/npm/dm/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![Build Status](http://img.shields.io/travis/koistya/react-static-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/koistya/react-static-boilerplate)
[![Dependency Status](http://img.shields.io/david/dev/koistya/react-static-boilerplate.svg?branch=master&style=flat-square)](https://david-dm.org/koistya/react-static-boilerplate#info=devDependencies)
[![OpenCollective](https://opencollective.com/react-static-boilerplate/badge/backers.svg)](#backers)
[![OpenCollective](https://opencollective.com/react-static-boilerplate/badge/sponsors.svg)](#sponsors)

> A static website starter kit powered by [React.js](http://facebook.github.io/react/)
> and [Webpack](http://webpack.github.io/).

Visit [demo site](http://react-static.tarkus.me) &nbsp;|&nbsp;
See [roadmap](https://waffle.io/koistya/react-static-boilerplate) &nbsp;|&nbsp;
Join [#react-static-boilerplate](https://gitter.im/koistya/react-static-boilerplate) chatroom on Gitter to stay up to date.

### Features

&nbsp; &nbsp; ✓ Generates static `.html` pages from [React](http://facebook.github.io/react/) components<br>
&nbsp; &nbsp; ✓ Generates routes based on the list of files in the `/pages` folder<br>
&nbsp; &nbsp; ✓ Next generation JavaScript with [Babel](https://github.com/babel/babel)<br>
&nbsp; &nbsp; ✓ [Sass](http://sass-lang.com/) syntax for CSS via [postCSS](https://github.com/postcss/postcss) and [precss](https://github.com/jonathantneal/precss)<br>
&nbsp; &nbsp; ✓ Development web server with [BrowserSync](http://www.browsersync.io) and [React Transform](https://github.com/gaearon/babel-plugin-react-transform)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](http://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>
&nbsp; &nbsp; ✓ Easy deployment to [GitHub Pages](https://pages.github.com/), [Amazon S3](http://davidwalsh.name/hosting-website-amazon-s3) or [Firebase](https://www.firebase.com/)<br>
&nbsp; &nbsp; ✓ [Yeoman](http://yeoman.io/) generator ([generator-react-static](https://www.npmjs.com/package/generator-react-static))<br>

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /components/                # React components
├── /core/                      # Core framework
├── /pages/                     # React.js-based web pages
│   ├── /blog/                  # Blog post entries example
│   ├── /404.js                 # Not Found page
│   ├── /500.js                 # Error page
│   ├── /about.js               # About Us page
│   └── /index.js               # Home page
├── /static/                    # Static files such as favicon.ico etc.
├── /test/                      # Unit and integration tests
├── /tools/                     # Build automation scripts and utilities
│── app.js                      # The main JavaScript file (entry point)
│── config.js                   # Website configuration / settings
│── LICENSE.txt                 # License file
│── package.json                # Dev dependencies and NPM scripts
└── README.md                   # Project overview
```

### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```
$ git clone -o react-static-boilerplate -b master --single-branch \
      https://github.com/koistya/react-static-boilerplate.git MyApp
$ cd MyApp
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

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

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch react-static-boilerplate
$ git merge react-static-boilerplate/master
$ npm install
```
### Related Projects

  * [React Starter Kit](https://github.com/kriasoft/react-starter-kit)
  * [React Routing](https://github.com/kriasoft/react-routing)
  * [React Decorators](https://github.com/kriasoft/react-decorators)

### Learn More

  * [Getting Started with React.js](http://facebook.github.io/react/)
  * [Getting Started with GraphQL and Relay](https://quip.com/oLxzA1gTsJsE)
  * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
  * [React.js Discussion Board](https://discuss.reactjs.org/)
  * [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)


### Backers

Support us with a monthly donation, help us continue our activities and see your avatar here on our readme. [[Become a backer](https://opencollective.com/react-static-boilerplate#backer)]

<a href="https://opencollective.com/react-static-boilerplate/backer/0/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/1/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/2/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/3/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/4/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/5/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/6/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/7/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/8/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/9/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/10/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/11/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/12/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/13/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/14/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/15/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/16/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/17/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/18/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/19/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/20/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/21/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/22/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/23/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/24/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/25/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/26/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/27/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/28/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/backer/29/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/backer/29/avatar.svg"></a>

### Sponsors

Become a sponsor and get your logo here. [[Become a sponsor](https://opencollective.com/react-static-boilerplate#sponsor)]

<a href="https://opencollective.com/react-static-boilerplate/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/10/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/11/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/12/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/13/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/14/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/15/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/16/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/17/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/18/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/19/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/20/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/21/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/22/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/23/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/24/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/25/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/26/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/27/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/28/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/react-static-boilerplate/sponsor/29/website" target="_blank"><img src="https://opencollective.com/react-static-boilerplate/sponsor/29/avatar.svg"></a>

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/koistya/react-static-boilerplate/graphs/contributors) &nbsp;|&nbsp; MIT License
