# React Static Boilerplate

[![NPM version](http://img.shields.io/npm/v/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![NPM downloads](http://img.shields.io/npm/dm/generator-react-static.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-static)
[![Build Status](http://img.shields.io/travis/koistya/react-static-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/koistya/react-static-boilerplate)
[![Dependency Status](http://img.shields.io/david/dev/koistya/react-static-boilerplate.svg?branch=master&style=flat-square)](https://david-dm.org/koistya/react-static-boilerplate#info=devDependencies)

> A static website starter kit powered by [React.js](http://facebook.github.io/react/)
> and [Webpack](http://webpack.github.io/).

Join [#react-static-boilerplate](https://gitter.im/koistya/react-static-boilerplate) chatroom on Gitter to stay up to date.

### Features

&nbsp; &nbsp; ✓ Generates static `.html` pages from [React](http://facebook.github.io/react/) components<br>
&nbsp; &nbsp; ✓ Generates routes based on the list of files in the `/src` folder<br>
&nbsp; &nbsp; ✓ Next generation JavaScript with [Babel](https://github.com/babel/babel)<br>
&nbsp; &nbsp; ✓ Next generation CSS with [postCSS](https://github.com/postcss/postcss) and [cssnext](http://cssnext.io/)<br>
&nbsp; &nbsp; ✓ Development web server with [React Hot Loader](http://gaearon.github.io/react-hot-loader/) and [BrowserSync](http://www.browsersync.io)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](http://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>
&nbsp; &nbsp; ✓ Easy deployment to [GitHub Pages](https://pages.github.com/) or [Amazon S3](http://davidwalsh.name/hosting-website-amazon-s3)<br>
&nbsp; &nbsp; ✓ [Yeoman](http://yeoman.io/) generator ([generator-react-static](https://www.npmjs.com/package/generator-react-static))<br>

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

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # React.js-based web pages
│   ├── /blog/                  # Blog post entries example
│   ├── /img/                   # Website images
│   ├── /js/                    # JavaScript code and React.js components
│   ├── /404.js                 # 'Not found' page
│   ├── /about.js               # 'About' page
│   └── /index.js               # 'Home' page
├── /test/                      # Unit tests
├── /tools/                     # Build automation scripts
│── LICENSE.txt                 # License file
│── package.json                # Dev dependencies and NPM scripts
└── README.md                   # Project overview
```

### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```
$ npm test
```

### How to Deploy

```shell
$ npm run deploy                # Deploys the project to GitHub Pages
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
 * [React.js Wiki on GitHub](https://github.com/facebook/react/wiki)
 * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
 * [React.js Discussion Board](https://discuss.reactjs.org/)
 * [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/koistya/react-static-boilerplate/graphs/contributors) &nbsp;|&nbsp; MIT License
