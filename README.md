<h1>
  React Starter Kit for Firebase &nbsp; <sup><i>a.k.a. Serverless Edition</i></sup><br>
  <a href="https://circleci.com/gh/kriasoft/react-firebase-starter"><img src="https://circleci.com/gh/kriasoft/react-firebase-starter.svg?style=svg" alt="Build Status" height="20" /></a>
  <img src="https://api.dependabot.com/badges/status?host=github&repo=kriasoft/react-firebase-starter" alt="Dependabot" height="20" />
  <a href="https://opencollective.com/react-firebase-starter"><img src="https://opencollective.com/react-firebase-starter/backers/badge.svg?maxAge=3600" height="20"></a>
  <a href="https://twitter.com/ReactStarter"><img src="https://img.shields.io/twitter/follow/ReactStarter.svg?style=social&amp;label=Follow&amp;maxAge=3600" alt="Twitter" height="20"></a>
  <a href="https://discord.gg/2nKEnKq"><img src="https://img.shields.io/badge/chat-Discord-green.svg?style=social&amp;maxAge=3600" height="20"></a>
</h1>

**React Starter Kit** _for Firebase_ is a popular project template (aka, boilerplate) for building
modern, scalable web applications with React, Relay, and GraphQL using serverless infrastructure
provided by <a href="https://cloud.google.com/">Google Cloud</a> (Cloud SQL, Cloud Functions, CDN
hosting, and file storage). It allows you to save time and build upon a solid foundation and
design patterns.

<p align="center"><strong>View</strong> <a href="https://firebase.reactstarter.com">online demo</a> (<a href="https://firebase.reactstarter.com/graphql">API</a>, <a href="https://firebase.reactstarter.com/graphql/model">data model</a>) &nbsp;|&nbsp; <strong>Follow us</strong> on <a href="https://twitter.com/ReactStarter">Twitter</a> &nbsp;|&nbsp; <strong>Get FREE support</strong> on <a href="https://discord.gg/2nKEnKq">Discord</a> &nbsp;|&nbsp; <a href="https://angel.co/company/kriasoft/jobs/"><strong>We're hiring!</strong></a></p>

<a href="https://reactstarter.com/s/1"><img src="https://reactstarter.com/s/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/2"><img src="https://reactstarter.com/s/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/3"><img src="https://reactstarter.com/s/3.png" height="60" /></a>

---

This project was bootstrapped with [React Starter Kit for Firebase][rfs] by [Kriasoft][kriasoft].

### Tech Stack

- [Create React App][cra] (★ 73k) for development and test infrastructure (see [user guide][cradocs])
- [Material UI][mui] (★ 52k) to reduce development time by integrating Google's [Material Design][material]
- [Passport.js][passport] (★ 17k) for authentication configured with stateless JWT tokens for sessions
- [GraphQL.js][gqljs] (★ 15k) and [Relay][relay] (★ 14k) for declarative data fetching and efficient client stage management
- [Universal Router][router] (★ 1k) + [history][history] (★ 6k) for declarative routing and client-side navigation optimized for [Relay][relay]
- [PostgreSQL][psql] database pre-configured with a query builder and migrations using [Knex.js][knex] (★ 11k)
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
│   ├── hooks/                     # React.js hooks and Context providers
│   ├── icons/                     # Icon components
│   ├── legal/                     # Terms of Use, Privacy Policy, etc.
│   ├── misc/                      # Other pages (about us, contacts, etc.)
│   ├── mutations/                 # GraphQL mutations to be used on the client
│   ├── news/                      # News section (example)
│   ├── server/                    # Server-side code (API, authentication, etc.)
│   │   ├── mutations/             # GraphQL mutations
│   │   ├── queries/               # The top-level GraphQL query fields
│   │   ├── templates/             # HTML templates for server-side rendering
│   │   ├── types/                 # GraphQL types: User, UserRole, UserIdentity etc.
│   │   ├── api.js                 # GraphQL API middleware
│   │   ├── app.js                 # Express.js application
│   │   ├── config.js              # Configuration settings to be passed to the client
│   │   ├── context.js             # GraphQL context wrapper
│   │   ├── db.js                  # PostgreSQL database client (Knex.js)
│   │   ├── relay.js               # Relay factory method for Node.js environment
│   │   ├── index.js               # Node.js app entry point
│   │   ├── login.js               # Authentication middleware (e.g. /login/facebook)
│   │   ├── schema.js              # GraphQL schema
│   │   └── ssr.js                 # Server-side rendering, e.g. ReactDOMServer.renderToString(<App />)
│   ├── user/                      # User pages (login, account settings, user profile, etc)
│   ├── utils/                     # Utility functions
│   ├── relay.js                   # Relay factory method for browser environment
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

- [Node.js][nodejs] v10.15 or higher + [Yarn][yarn] v1.17 or higher &nbsp; (_HINT: On Mac install
  them via [Brew][brew]_)
- [VS Code][vc] editor (preferred) + [Project Snippets][vcsnippets], [EditorConfig][vceditconfig],
  [ESLint][vceslint], [Prettier][vcprettier], and [Babel JavaScript][vcjs] plug-ins
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

In order to re-compile GraphQL fragments, run `yarn relay` or `yarn relay --watch` (in watch mode).

### How to Migrate Database Schema

While the app is in development, you can use a simplified migration workflow by
creating a backup of your existing database, making changes to the existing
migration file (see `migrations/20180101000000_initial.js`), re-apply the
migration and restore data from the backup file (`backup.sql`):

```bash
$ yarn db-backup --env=dev         # Or, yarn db-backup --env=test
$ yarn db-reset-dev                # Or, yarn db-reset-test
```

Upon deployment to production, switch to normal migration workflow:

```bash
$ yarn db-change <name>            # Create a new database migration file
$ yarn db-migrate --env=dev        # Migrate database to the latest version
```

**HINT**: Test your migration thoroughly with a local instance of the DB first
(by using `--env=local` or `--env=dev` (default) flag) then apply it to your
`test` or `prod` database instance using `--env=test` or `--env=prod` command
argument.

Other helpful database scripts:

```bash
$ yarn db-version --env=dev        # Print the version number of the last migration
$ yarn db-rollback --env=dev       # Rollback the latest migration
$ yarn db-restore --env=dev        # Restore database from backup.sql
$ yarn db-seed --env=dev           # Seed database with test data
$ yarn db --env=dev                # Open Knex.js REPL shell (type ".exit" for exit)
$ yarn psql --env=dev              # Open PostgreSQL shell (type "\q" for exit)
```

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

### Backers

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

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
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[vcjs]: https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel
[watchman]: https://github.com/facebook/watchman
[postgres]: https://www.postgresql.org/
[bc]: https://www.scootersoftware.com/
