## How to Publish Website to [GitHub Pages](https://pages.github.com/)

### Step 1

Add deployment script to `run.js`:

```js
tasks.set('publish', () => {
  const remote = {
    url: 'https://github.com/<owner>/<repo>.git', // TODO: Update deployment URL
    branch: 'gh-pages',
  };
  global.DEBUG = process.argv.includes('--debug') || false;
  const spawn = require('child_process').spawn;
  const opts = { cwd: path.resolve(__dirname, './build'), stdio: ['ignore', 'inherit', 'inherit'] };
  const git = (...args) => new Promise((resolve, reject) => {
    spawn('git', args, opts).on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`git ${args.join(' ')} => ${code} (error)`));
      }
    });
  });

  return Promise.resolve()
    .then(() => run('clean'))
    .then(() => git('init', '--quiet'))
    .then(() => git('config', '--get', 'remote.origin.url')
      .then(() => git('remote', 'set-url', 'origin', remote.url))
      .catch(() => git('remote', 'add', 'origin', remote.url))
    )
    .then(() => git('ls-remote', '--exit-code', remote.url, 'master')
      .then(() => Promise.resolve()
        .then(() => git('fetch', 'origin'))
        .then(() => git('reset', `origin/${remote.branch}`, '--hard'))
        .then(() => git('clean', '--force'))
      )
      .catch(() => Promise.resolve())
    )
    .then(() => run('build'))
    .then(() => git('add', '.', '--all'))
    .then(() => git('commit', '--message', new Date().toUTCString())
      .catch(() => Promise.resolve()))
    .then(() => git('push', 'origin', `HEAD:${remote.branch}`, '--force', '--set-upstream'));
});
```

### Step 2

Whenever you need to compile and publish your site to GitHub Pages simply run:

```sh
$ node run publish
```

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)
