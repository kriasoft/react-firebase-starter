/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import File from 'vinyl';
import through from 'through2';
import createTemplate from 'lodash/string/template';
import templateSource from 'raw!../content/index.html';
import { routes, render } from './router.js';

const paths = Object.keys(routes);
const template = createTemplate(templateSource);

export default function() {

  let count = 0;
  const stream = through.obj((file, encoding, cb) => {
    cb(null, new File(file));
  });

  paths.forEach(async (path) => {
    var filename;

    if (path === '/') {
      filename = './index.html';
    } else if (Object.keys(routes).some(x => x.startsWith(path + '/'))) {
      filename = '.' + path + '/index.html';
    } else {
      filename = '.' + path + '.html';
    }

    const body = await render(path);
    const contents = template({title: '', body});

    stream.write({
      path: filename,
      contents: new Buffer(contents)
    }, 'utf8', () => {
      if (++count === paths.length) {
        stream.end();
      }
    });
  });

  return stream;
}
