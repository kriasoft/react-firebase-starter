# React Starter Kit &nbsp; <sup><samp>for Firebase and GraphQL</samp></sup> &nbsp; <a href="https://circleci.com/gh/kriasoft/react-firebase-starter"><img src="https://circleci.com/gh/kriasoft/react-firebase-starter.svg?style=svg" alt="Build Status" height="20" /></a> <a href="https://twitter.com/ReactStarter"><img src="https://img.shields.io/twitter/follow/ReactStarter.svg?style=social&label=Follow&maxAge=3600" alt="Twitter" height="20"></a>

[**React Firebase Starter**](https://github.com/kriasoft/react-firebase-starter) (RFS) is a popular project template (aka boilerplate) for creating single-page applications with React, Firebase and GraphQL.

**View** [online demo](https://react-firebase.kriasoft.com) &nbsp;|&nbsp; **Follow us** on [Twitter](https://twitter.com/ReactStarter) &nbsp;|&nbsp; **Get Support** on [Telegram][telegram] &nbsp;|&nbsp; **Visit our sponsors**:

<p align="center">
  <a href="https://rollbar.com/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)" target="_blank">
    <img src="https://koistya.github.io/files/rollbar-384x64.png" width="192" height="32">
  </a>
  <a href="https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective" target="_blank">
    <img src="https://koistya.github.io/files/digital-ocean-393x64.png" width="196.5" height="32">
  </a>
</p>

---

This project was bootstraped with [React Firebase Starter][rfs] by [Kriasoft][kriasoft] (get support on [Telegram][telegram]).

### Tech Stack

* [Create React App][cra] for development and test infrastructure (see [user guide][cradocs])
* [Material UI][mui] to reduce development time by integrating Google's [Material Design][material]
* [Styled Components][sc] for component friendly CSS styles ([docs][scdocs])
* [Firebase][firebase] for serverless architecture, authentication and free CDN hosting ([docs][fbdocs])
* [Universal Router][router] + [history][history] for declarative routing and client-side navigation

Also, you need to be familiar with [HTML][html], [CSS][css], [JavaScript][js] ([ES2015][es2015]) and [React](https://reactjs.org/docs/).

### Directory Layout

```bash
├── build/                         # Compiled output
├── node_modules/                  # 3rd-party libraries and utilities
├── public/                        # Static files such as favicon.ico etc.
├── src/                           # Application source code
│   ├── components/                # Shared React components
│   ├── routes/                    # Components for pages/screens + routing information
│   ├── app.browser.js             # Client-side rendering, e.g. ReactDOM.render(<App />, container)
│   ├── app.node.js                # Server-side rendering, e.g. ReactDOMServer.renderToString(<App />)
│   ├── auth.js                    # Authentication manager
│   ├── history.js                 # Client-side navigation manager
│   ├── index.js                   # <== Application entry point (main) <===
│   ├── registerServiceWorker.json # This list of application routes
│   ├── relay.js                   # Relay Modern client
│   ├── graphql.schema             # GraphQL schema obtained from a GraphQL API
│   ├── server.js                  # Server-side entiry point, e.g. app.listen(process.env.PORT)
│   └── theme.js                   # Overrides for Material UI default styles
├── package.json                   # The list of project dependencies + NPM scripts
└── setup.js                       # Customizations for create-react-app
```

### Prerequisites

* [Node.js][nodejs] v8.9 or higher + [Yarn][yarn] v1.3 or higher &nbsp; (_HINT: On Mac install
  them via [Brew][brew]_)
* [VS Code][vc] editor (preferred) + [Project Snippets][vcsnippets], [EditorConfig][vceditconfig],
  [ESLint][vceslint], [Flow][vcflow], [Prettier][vcprettier], and [Babel JavaScript][vcjs] plug-ins

### Getting Started

Just clone the repo and start hacking:

```bash
$ git clone https://github.com/kriasoft/react-firebase-starter.git MyApp
$ cd MyApp
$ yarn install                     # Install project dependencies listed in package.json
$ yarn start                       # Compiles the app and opens it in a browser with "live reload"
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

<p align='center'><img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'></p>

### How to Test

```bash
$ yarn lint                        # Check JavaScript and CSS code for potential issues
$ yarn fix                         # Attempt to automatically fix ESLint warnings
$ yarn test                        # Run unit tests. Or, `yarn test -- --watch`
```

### How to Deploy

```bash
$ yarn build                      # Build the app for production
$ firebase deploy                 # Deploy to Firebase
```

### How to Update

If you keep the original Git history after cloning this repo, you can always fetch and merge
the recent updates back into your project by running:

```bash
git remote add react-firebase-starter https://github.com/kriasoft/react-firebase-starter.git
git checkout master
git fetch react-firebase-starter
git merge react-firebase-starter/master
yarn install
yarn relay
```

_NOTE: Try to merge as soon as the new changes land on the master branch in Node.js API Starter
repository, otherwise your project may differ too much from the base/upstream repo._

### How to Contribute

Anyone and everyone is welcome to [contribute](CONTRIBUTING.md) to this project. The best way to
start is by checking our [open issues](https://github.com/kriasoft/react-firebase-starter/issues),
[submit a new issues](https://github.com/kriasoft/react-firebase-starter/issues/new?labels=bug) or
[feature request](https://github.com/kriasoft/react-firebase-starter/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike, send [pull
requests](CONTRIBUTING.md#pull-requests).

### Learn React.js and ES6

:mortar_board: &nbsp; [React for Beginners](https://reactforbeginners.com/friend/konstantin) and [ES6 Training Course](https://es6.io/friend/konstantin) by Wes Bos<br>
:green_book: &nbsp; [React: Up & Running: Building Web Applications](http://amzn.to/2bBgqhl) by Stoyan Stefanov (Aug, 2016)<br>
:green_book: &nbsp; [Getting Started with React](http://amzn.to/2bmwP5V) by Doel Sengupta and Manu Singhal (Apr, 2016)<br>
:green_book: &nbsp; [You Don't Know JS: ES6 & Beyond](http://amzn.to/2bBfVnp) by Kyle Simpson (Dec, 2015)<br>

### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Boilerplate and tooling for
  building isomorphic web apps with React and Relay
* [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter) — Boilerplate and
  tooling for building data APIs with Docker, Node.js and GraphQL

### License

Copyright © 2015-present Kriasoft. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-firebase-starter/blob/master/LICENSE.txt) file.

---

Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@tarkus))
and [contributors](https://github.com/kriasoft/react-firebase-starter/graphs/contributors)

[rfs]: https://github.com/kriasoft/react-firebase-starter
[kriasoft]: https://www.kriasoft.com/
[telegram]: https://t.me/ReactStarter
[cra]: https://github.com/facebookincubator/create-react-app
[mui]: https://material-ui-next.com/
[material]: https://material.io/
[cradocs]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[es2015]: http://babeljs.io/learn-es2015/
[react]: https://facebook.github.io/react/
[relay]: https://facebook.github.io/relay/
[firebase]: https://firebase.google.com/
[fbdocs]: https://firebase.google.com/docs/web
[router]: https://github.com/kriasoft/universal-router
[history]: https://github.com/ReactTraining/history
[sc]: https://www.styled-components.com/
[scdocs]: https://www.styled-components.com/docs
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[brew]: https://brew.sh/
[wm]: https://facebook.github.io/watchman/
[relaycompiler]: http://facebook.github.io/relay/docs/relay-compiler.html
[vc]: https://code.visualstudio.com/
[vcsnippets]: https://marketplace.visualstudio.com/items?itemName=rebornix.project-snippets
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcflow]: https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[vcjs]: https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel
