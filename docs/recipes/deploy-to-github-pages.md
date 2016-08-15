## How to Publish Website to [GitHub Pages](https://pages.github.com/)

### Step 1

Add deployment script to `run.js`:

```js
tasks.set('publish', () => {
  const ghPages = require('gh-pages');
  global.DEBUG = process.argv.includes('--debug') || false;
  const publish = (dir) => new Promise((resolve, reject) => {
    ghPages.publish(dir, {}, (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });

  return Promise.resolve()
    .then(() => run('clean'))
    .then(() => run('build'))
    .then(() => publish(`${__dirname}/public`));
});
```

### Step 2

Whenever you need to compile and publish your site to GitHub Pages simply run:

```sh
$ node run publish
```

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)
