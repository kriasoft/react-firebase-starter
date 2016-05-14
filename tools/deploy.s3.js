/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

const s3 = require('s3');
const task = require('./task');

module.exports = task('deploy', () => Promise.resolve()
  .then(() => require('./build'))
  .then(() => new Promise((resolve, reject) => {
    const client = s3.createClient({
      s3Options: {
        region: 'us-east-1',
        sslEnabled: true,
      },
    });
    const uploader = client.uploadDir({
      localDir: 'build',
      deleteRemoved: true,
      s3Params: { Bucket: 'www.example.com' },
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  }))
);
