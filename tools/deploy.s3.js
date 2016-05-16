/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
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
