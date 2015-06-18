# React Static Boilerplate ![status](https://img.shields.io/badge/status-early%20preview-orange.svg?style=flat-square)

> Static website generator built on top of React.js and Gulp/Webpack

### Features

&nbsp; &nbsp; ✓ Generates static `.html` pages from [React](http://facebook.github.io/react/) components<br>
&nbsp; &nbsp; ✓ Generates routes based on the list of files in the `/content` folder<br>
&nbsp; &nbsp; ✓ Next generation JavaScript with [Babel](https://github.com/babel/babel)<br>
&nbsp; &nbsp; ✓ Next generation CSS with [postCSS](https://github.com/postcss/postcss) and [cssnext](http://cssnext.io/)<br>
&nbsp; &nbsp; ✓ Development web-server with [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Gulp](http://gulpjs.com/)/[Webpack](http://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>
&nbsp; &nbsp; ✓ Easy deployment to [GitHub Pages](https://pages.github.com/) or [Amazon S3](http://davidwalsh.name/hosting-website-amazon-s3)<br>

### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```
$ git clone -o upstream https://github.com/koistya/react-static-boilerplate MyApp
$ cd MyApp
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /components/                # React.js components
├── /content/                   # React.js-based web pages and other assets
├── /node_modules/              # 3rd-party libraries and utilities
├── /scripts/                   # JavaScript code
│   ├── /app.js                 # Startup script
│   ├── /pages.js               # Utility to generate html pages during a build
│   └── /routes-loader.js       # Webpack loader to generate the list of URLs
│── gulpfile.babel.js           # Build automation script(s)
│── package.json                # The list of 3rd party libraries and utilities
└── webpack.config.js           # Configuration for bundling and optimization
```

### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```
$ npm test
```

### How to Deploy

```shell
$ npm run build -- --release    # Builds the project in release mode
$ npm run deploy                # Deploys the project to GitHub Pages
```

### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch upstream
$ git merge upstream/master
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
Copyright (c) Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) | MIT License
