## How to Publish Website to Amazon S3

### Step 1

Configure S3 bucket for hosting a static site:

http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

### Step 2

Install [`s3`](https://github.com/andrewrk/node-s3-client) npm module:

```sh
$ npm install s3 --save-dev
```

### Step 3

Add deployment script to `run.js`:

```js
tasks.set('publish', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  const s3 = require('s3');
  return run('build').then(() => new Promise((resolve, reject) => {
    const client = s3.createClient({
      s3Options: {
        region: 'us-east-1',
        sslEnabled: true,
      },
    });
    const uploader = client.uploadDir({
      localDir: 'public',
      deleteRemoved: true,
      s3Params: { Bucket: 'www.example.com' }, // TODO: Update deployment URL
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  }));
});
```

Step 4

Whenever you need to compile and publish your site to Amazon S3 simply run:

```sh
$ node run publish
```

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)
