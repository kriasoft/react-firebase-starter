## How to Publish Website to Amazon S3

`1`. Configure S3 bucket for hosting a static site:

http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

`2`. Install [`s3`](https://github.com/andrewrk/node-s3-client) npm module:

```sh
$ npm install s3 --save-dev
```

`3`. Add deployment script to `run.js`:

```js
tasks.set('publish', () => {
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

`4`. Whenever you need to publish your site to Amazon S3 simply run:

```sh
$ node run publish --release
```
