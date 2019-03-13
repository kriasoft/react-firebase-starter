<h1>
  React Starter Kit for Firebase &nbsp; <sup><i>a.k.a. Serverless Edition</i></sup><br>
  <a href="https://circleci.com/gh/kriasoft/react-firebase-starter"><img src="https://circleci.com/gh/kriasoft/react-firebase-starter.svg?style=svg" alt="Build Status" height="20" /></a>
  <a href="https://opencollective.com/react-firebase-starter"><img src="https://opencollective.com/react-firebase-starter/backers/badge.svg?maxAge=3600" height="20"></a>
  <a href="https://twitter.com/ReactStarter"><img src="https://img.shields.io/twitter/follow/ReactStarter.svg?style=social&amp;label=Follow&amp;maxAge=3600" alt="Twitter" height="20"></a>
  <a href="https://t.me/ReactStarter"><img src="https://img.shields.io/badge/chat-Telegram-green.svg?style=social&amp;maxAge=3600" height="20"></a>
</h1>

**React Starter Kit** _for Firebase_ is a popular project template (aka, boilerplate) for building
modern, scalable web applications with React, Relay, and GraphQL using serverless infrastructure
provided by <a href="https://cloud.google.com/">Google Cloud</a> (Cloud SQL, Cloud Functions, CDN
hosting, and file storage). It allows you to save time and build upon a solid foundation and
design patterns.

<p align="center"><strong>View</strong> <a href="https://firebase.reactstarter.com">online demo</a> (<a href="https://firebase.reactstarter.com/graphql">API</a>, <a href="https://firebase.reactstarter.com/graphql/model">data model</a>) &nbsp;|&nbsp; <strong>Follow us</strong> on <a href="https://twitter.com/ReactStarter">Twitter</a> &nbsp;|&nbsp; <strong>Get FREE support</strong> on <a href="https://t.me/ReactStarter">Telegram</a> &nbsp;|&nbsp; <strong>Visit our sponsors</strong>:</p>

<p align="center">
  <a href="https://rollbar.com/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)" target="_blank">
    <img src="https://koistya.github.io/files/rollbar-384x64.png" width="192" height="32">
  </a>
  <sup><a href="https://rollbar.com/jobs/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)">Hiring</a></sup> &nbsp;
  <a href="https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective" target="_blank">
    <img src="https://koistya.github.io/files/digital-ocean-393x64.png" width="196.5" height="32">
  </a>
</p>

---

This project was bootstraped with [React Starter Kit for Firebase][rfs] by [Kriasoft][kriasoft].

### Tech Stack

- [Create React App][cra] (★ 64k) for development and test infrastructure (see [user guide][cradocs])
- [Material UI][mui] (★ 45k) to reduce development time by integrating Google's [Material Design][material]
- [Passport.js][passport] (★ 15k) for authentication configured with stateless JWT tokens for sessions
- [GraphQL.js][gqljs] (★ 13k) and [Relay][relay] (★ 11k) for declarative data fetching and efficient client stage management
- [Universal Router][router] (★ 1k) + [history][history] (★ 3k) for declarative routing and client-side navigation optimized for [Relay][relay]
- [PostgreSQL][psql] database pre-configured with a query builder and migrations using [Knex.js][knex] (★ 10k)
- [Google Cloud][gcp] & [Firebase][firebase] for serverless architecture - Cloud SQL, Cloud Functions, CDN hosting, file storage ([docs][fbdocs])

Also, you need to be familiar with [HTML][html], [CSS][css], [JavaScript][js] ([ES2015][es2015]) and [React](https://reactjs.org/docs/).

### Directory Layout

```bash
├── build/                         # Compiled output
├── migrations/                    # Database schema migration files
├── node_modules/                  # 3rd-party libraries and utilities
├── public/                        # Static files such as favicon.ico etc.
├── scripts/                       # Automation scripts (yarn update-schema etc.)
├── src/                           # Application source code
│   ├── admin/                     # Admin section (Dashboard, User Management etc.)
│   ├── common/                    # Shared React components and HOCs
│   ├── icons/                     # Icon components
│   ├── legal/                     # Terms of Use, Privacy Policy, etc.
│   ├── misc/                      # Other pages (about us, contacts, etc.)
│   ├── news/                      # News section (example)
│   ├── server/                    # Server-side code (API, authentication, etc.)
│   │   ├── db/                    # Database client
│   │   ├── story/                 # Story related schema, queries, and mutations
│   │   ├── templates/             # HTML templates for server-side rendering
│   │   ├── user/                  # User related schema, queries, and mutations
│   │   ├── api.js                 # GraphQL API middleware
│   │   ├── Context.js             # GraphQL context wrapper
│   │   ├── createRelay.js         # Relay factory method for Node.js environment
│   │   ├── index.js               # Node.js app entry point
│   │   ├── login.js               # Authentication middleware (e.g. /login/facebook)
│   │   ├── schema.js              # GraphQL schema
│   │   └── ssr.js                 # Server-side rendering, e.g. ReactDOMServer.renderToString(<App />)
│   ├── user/                      # User pages (login, account settings, user profile, etc)
│   ├── utils/                     # Utility functions
│   ├── createRelay.js             # Relay factory method for browser envrironment
│   ├── hooks.js                   # React.js hooks and Context providers
│   ├── index.js                   # Client-side entry point, e.g. ReactDOM.render(<App />, container)
│   ├── router.js                  # Universal application router
│   ├── serviceWorker.js           # Service worker helper methods
│   └── theme.js                   # Overrides for Material UI default styles
├── ssl/                           # SSL certificates for connecting to Cloud SQL instance
├── .env                           # Environment variables for local development
├── .env.production                # Environment variables for the production build
├── .env.test                      # Environment variables for the test build
├── graphql.schema                 # GraphQL schema (auto-generated, used by Relay)
└── package.json                   # The list of project dependencies + NPM scripts
```

### Prerequisites

- [Node.js][nodejs] v8.15 or higher + [Yarn][yarn] v1.13 or higher &nbsp; (_HINT: On Mac install
  them via [Brew][brew]_)
- [VS Code][vc] editor (preferred) + [Project Snippets][vcsnippets], [EditorConfig][vceditconfig],
  [ESLint][vceslint], [Flow][vcflow], [Prettier][vcprettier], and [Babel JavaScript][vcjs] plug-ins
- [Watchman][watchman] file watcher used by Relay Modern
- [PostgreSQL][postgres] v9.6 or newer, only if you're planning to use a local db for development

### Getting Started

Just clone the repo, update environment variables in `.env` and/or `.env.local` file, and start
hacking:

```bash
$ git clone https://github.com/kriasoft/react-firebase-starter.git MyApp
$ cd MyApp
$ yarn setup                       # Installs dependencies; creates PostgreSQL database
$ yarn start                       # Compile the app and opens it in a browser with "live reload"
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

<p align='center'><img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'></p>

### How to Migrate Database Schema

```bash
$ yarn db-change                   # Create a new database migration file
$ yarn db-migrate                  # Migrate database to the latest version
$ yarn db-rollback                 # Rollback the latest migration
$ yarn db-backup --env=prod        # Write database backup to backup.sql
$ yarn db-restore --env=dev        # Restore database from backup.sql
$ yarn db                          # Open PostgreSQL shell (for testing/debugging)
```

**Note**: Appending `--env=prod` or `--env=test` flags to any of the commands above will load the
corresponding database settings for the selected deployment environment from
[Firebase Config API](https://firebase.google.com/docs/functions/config-env)

### How to Test

```bash
$ yarn lint                        # Check JavaScript and CSS code for potential issues
$ yarn lint-fix                    # Attempt to automatically fix ESLint warnings
$ yarn test                        # Run unit tests. Or, `yarn test -- --watch`
```

### How to Deploy

```bash
$ yarn build                       # Build the in production mode (NODE_ENV=production)
$ yarn deploy-test                 # Deploy the app to TEST environment
$ yarn deploy-prod                 # Deploy the app to PROD environment
```

For more information refer to the [Deployment](https://github.com/kriasoft/react-firebase-starter/wiki/deployment)
guide in the project's Wiki.

### How to Update

If you keep the original Git history after cloning this repo, you can always fetch and merge
the recent updates back into your project by running:

```bash
$ git remote add rsk https://github.com/kriasoft/react-firebase-starter.git
$ git checkout master
$ git fetch rsk
$ git merge rsk/master
$ yarn install
```

_NOTE: Try to merge as soon as the new changes land on the `master` branch in the upstream
repository, otherwise your project may differ too much from the base/upstream repo.
Alternatively, you can use a folder diff tool like [Beyond Compare][bc] for keeping your project
up to date with the base repository._

### How to Contribute

Anyone and everyone is welcome to [contribute](https://github.com/kriasoft/react-firebase-starter/wiki/Contributing) to this project. The best way to
start is by checking our [open issues](https://github.com/kriasoft/react-firebase-starter/issues),
[submit a new issues](https://github.com/kriasoft/react-firebase-starter/issues/new?labels=bug) or
[feature request](https://github.com/kriasoft/react-firebase-starter/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike, send [pull
requests](https://github.com/kriasoft/react-firebase-starter/wiki/Contributing#pull-requests).

### Learn React.js and ES6

:mortar_board: &nbsp; [React for Beginners](https://reactforbeginners.com/friend/konstantin) and [ES6 Training Course](https://es6.io/friend/konstantin) by Wes Bos<br>
:green_book: &nbsp; [React: Up & Running: Building Web Applications](http://amzn.to/2bBgqhl) by Stoyan Stefanov (Aug, 2016)<br>
:green_book: &nbsp; [Getting Started with React](http://amzn.to/2bmwP5V) by Doel Sengupta and Manu Singhal (Apr, 2016)<br>
:green_book: &nbsp; [You Don't Know JS: ES6 & Beyond](http://amzn.to/2bBfVnp) by Kyle Simpson (Dec, 2015)<br>

### Related Projects

- [React App SDK](https://github.com/kriasoft/react-app) — Create React App modification that
  unlocks server-side rendering
- [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Boilerplate and tooling for
  building isomorphic web apps with React and Relay
- [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter) — Boilerplate and
  tooling for building data APIs with Docker, Node.js and GraphQL

### License

Copyright © 2015-present Kriasoft. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-firebase-starter/blob/master/LICENSE.txt) file.

---

Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@tarkus))
and [contributors](https://github.com/kriasoft/react-firebase-starter/graphs/contributors) :wave:
[Get in touch!](https://twitter.com/messages/compose?recipient_id=16394396)

[rfs]: https://github.com/kriasoft/react-firebase-starter
[kriasoft]: https://github.com/kriasoft
[telegram]: https://t.me/ReactStarter
[cra]: https://github.com/facebook/create-react-app
[cradocs]: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md
[psql]: https://www.postgresql.org/
[cloudsql]: https://cloud.google.com/sql/
[knex]: http://knexjs.org/
[gqljs]: http://graphql.org/graphql-js/
[relay]: http://facebook.github.io/relay/
[mui]: https://material-ui-next.com/
[material]: https://material.io/
[passport]: http://www.passportjs.org/
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[es2015]: http://babeljs.io/learn-es2015/
[react]: https://facebook.github.io/react/
[relay]: https://facebook.github.io/relay/
[gcp]: https://cloud.google.com/
[firebase]: https://firebase.google.com/
[fbdocs]: https://firebase.google.com/docs/web
[router]: https://github.com/kriasoft/universal-router
[history]: https://github.com/ReactTraining/history
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
[watchman]: https://github.com/facebook/watchman
[postgres]: https://www.postgresql.org/
[bc]: https://www.scootersoftware.com/
