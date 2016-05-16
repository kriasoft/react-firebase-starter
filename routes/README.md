## Application Routes

Each routes is just a plain JavaScript object having `path` (string or regular expression), `action`
(function) and optionally `children` (array with child routes) attributes, for example:

```js
import AboutPage from './AboutPage';

export default {

  path: '/about',

  action: () => ({
    title: 'About Us',
    component: AboutPage,
  }),

};
```

The `action()` (aka route handler) must return an object having `title` (string), `component`
(React component) and optionally `props` fields. It can be asynchronous, as the following example
demonstrates:

```js
import Post from './Post';

export default {

  path: '/posts/:id',

  async action({ params }) {
    const resp = await fetch(`/api/posts/${params.id}`);
    const data = await resp.json();
    return {
      title: data.title,
      component: Post,
      props: data,
    };
  },

};
```

In order to keep your project more organized, create a separate folder for each route (view/screen),
where each route may contain routing and data fetching logic, as well as all the UI components and
graphics required to render that particular view, for example:

```shell
├── /routes/                    # View/screen UI components + routing information
│   ├── /profile/               # User profile page, e.g. www.example.com/username
│   │   ├── /index.js           # Routing and fetching, e.g. { path: '/:username', action() { .. } }
│   │   ├── /ProfilePage.css    # Styles for the profile page
│   │   ├── /ProfilePage.js     # Profile page component
│   │   ├── /ProfilePicture.css # Styles for user's photo component
│   │   ├── /ProfilePicture.js  # User's photo component
│   │   ├── /UserAcitivy.css    # Style for user's activity component
│   │   └── /UserAcitivy.js     # User's activity component
│   └── /...                    # etc.
```
