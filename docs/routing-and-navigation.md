## Routing and Navigation

[React Static Boilerplate](https://github.com/kriasoft/react-static-boilerplate) (RSB) uses a
custom minimalistic (under 100 LOC) declarative routing approach that is easy to customize. It's
comprised of five major parts:

* **Routes** — the list of application routes in JSON format (see [`routes.json`](../routes.json))
* **Routes Loader** — a custom loader for Webpack that converts routes from JSON to JavaScript on
  build (see [`utils/routes-loader.js`](../utils/routes-loader.js))
* **URL Matcher** — a function that checks if a given URI matches to the route's `path` string (see
  `matchURI()` method in [`core/router.js`](../core/router.js))
* **Route Resolver** — a function just resolves a URI string to the first matched route, fetches
  all the required data and returns a React component to render (see `resolve()` method in
  [`core/router.js`](../core/router.js))
* **History** — client-side navigation library powered by [`history`](https://github.com/ReactJSTraining/history)
  npm module (the same one used in `react-router`) that helps with transitioning between pages
  (screens) in the browser without causing full-page refresh (see [`core/history.js`](../core/history.js))

The list of routes is just an array where each item contains a `path` - parametrized URL path string
and a `page` field that points to a corresponding UI (page or screen) component within the project's
file structure. For a simple to-do app, this list of routes may look like this (`routes.json`):

```json
[
  {
    "path": "/",
    "page": "./pages/home"
  },
  {
    "path": "/tasks/:status(pending|completed)?",
    "page": "./pages/tasks/list"
  },
  {
    "path": "/tasks/new",
    "page": "./pages/tasks/new"
  },
  {
    "path": "/tasks/:id",
    "page": "./pages/tasks/details"
  }
]
```

This list of routes is referenced inside the main application file (where the React app is beeing
bootstrapped) by using [`routes-loader`](../utils/routes-loader.js) (see [`main.js`](../main.js)):

```js
import routes from '!!./utils/routes-loader!./routes.json';
```

If you're new to Webpack's "loader" concept, please refer to https://webpack.github.io/docs/loaders

The [`routes-loader`](../utils/routes-loader.js) performs three tasks:

* Converts JSON-based routes into JavaScript
* Converts parametrized URL path strings into regular expressions by using
  [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)
* Wraps page/screen UI components' path strings into either `require.ensure(..)` (Webpack 1.x) or
  `System.import(..)` (Webpack 2.x). For more information see
  [code-splitting](https://webpack.github.io/docs/code-splitting) in Webpack docs.

For example, a route like this:

```json
{
  "path": "/tasks/:id",
  "page": "./pages/tasks/details"
}
```

Will become:

```js
{
  path: '/tasks/:id',
  pattern: /^\/tasks\/((?:[^\/]+?))(?:\/(?=$))?$/i,
  keys: [{ name: 'id', pattern: '[^\\/]+?', ... }],
  page: './pages/tasks/details',
  load: function() { return System.import('./pages/tasks/details'); }
}
```

Given the list of routes you can ask the router to "resolve" the given URI string to a React
component. The code for that may look something like this:

```js
router.resolve(routes, { pathname: '/tasks/123' }).then(component => {
  ReactDOM.render(component, container);
});
```

The `resolve(routes, context)` method will find the first route from the list matching to the
`/tasks/123` URI string, execute its `load()` method, and return corresponding React component as a
result wrapped into ES6 Promise (see [`core/router.js`](../core/router.js).

If a route contains some REST API or GraphQL endpoints as data requirements for the given route,
the `resolve(..)` method can also fetch the required data from these endpoints. For example, a
route that needs to fetch a task by its ID may look like this:

```json
{
  "path": "/tasks/:id",
  "page": "./pages/tasks/details",
  "fetch": {
    "task": "GET /api/tasks/$id",
  }
}
```

Finally, you can hook the router's `resolve(..)` method to be called each time when a user navigates
(transitions) between pages. The code for that may look something like this:

```js
function render(location) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
}

history.listen(render);
render(history.getCurrentLocation());
```

For more information about how the `history` npm module works please visit:
 
https://github.com/ReactJSTraining/history/tree/master/docs

All transitions between pages must be performed by using this module, for example:

```js
import React from 'react';
import history from '../../core/history';

class HomePage extends React.Component {

  transition = event => {
    event.preventDefault();
    history.push({ pathname: event.currentTarget.pathname });
  };

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p><a href="/tasks/123" onClick={this.transition}>Show task #123</a></p>
      </div>
    );
  }

}
```

The `transition(event)` method above cancels default behavior of the `<a>` element that causes
full-page refresh and instead redirects a user to the `/tasks/123` page by using HTML5 History API.
This transition is then handled by `history.listen(render)` listener inside the
[`main.js`](../main.js) file.

RSB comes with a helper component that can be used instead of `<a>` elements, see
[`components/Link/Link.js`](../components/Link/Link.js). So, instead of writing `<a href="/tasks/123"
onClick={this.transition}>Show task #123</a>` you can have `<Link to="/tasks/123">Show task #123</Link>`.

### Related Articles

* [You might not need React Router](https://medium.com/@tarkus/you-might-not-need-react-router-38673620f3d) by Konstantin Tarkus
