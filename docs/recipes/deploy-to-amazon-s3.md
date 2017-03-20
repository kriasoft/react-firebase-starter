## How to Publish Website to Amazon S3

### Step 1

Configure S3 bucket for hosting a static site:

http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

Set both index document and error document to `index.html`. This will allow refreshing any route (e.g. /about) without getting 404.
![S3 hosting settings for kriasoft/react-static-boilerplate](https://cloud.githubusercontent.com/assets/2770290/18042054/a68f0ca2-6e01-11e6-810d-9100e432b2f3.png)

### Step 2

Install [`s3`](https://github.com/andrewrk/node-s3-client) npm module:

```sh
$ npm install s3 --save-dev
```

### Step 3

Add deployment script to `publish.js`:

```js
module.exports = task('publish', () => new Promise((resolve, reject) => {
  const client = s3.createClient({
    s3Options: {
      region: 'us-east-1',
      sslEnabled: true,
    },
  });
  const uploader = client.uploadDir({
    localDir: 'public',
    deleteRemoved: true,
    s3Params: { Bucket: 'artgorithms' },
  });
  uploader.on('error', reject);
  uploader.on('end', resolve);
}));
```

Step 4

Whenever you need to compile and publish your site to Amazon S3 simply run:

```sh
$ yarn run publish
```

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)
