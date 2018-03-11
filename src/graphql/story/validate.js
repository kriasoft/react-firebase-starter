/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import validator from 'validator';
import type Context from '../Context';

export default function validate(input: any, ctx: Context) {
  const data = {};

  if (!input.title) {
    ctx.addError('title', 'The title field cannot be empty.');
  } else if (!validator.isLength(input.title.trim(), 5, 80)) {
    ctx.addError('title', 'The title must be between 5 and 80 characets long.');
  } else {
    data.title = input.title.trim();
  }

  if (!input.text) {
    ctx.addError('text', 'The text or URL field cannot be empty.');
  } else if (!validator.isLength(input.text.trim(), 10, 1000)) {
    ctx.addError(
      'text',
      'The text or URL field must be between 10 and 1000 characters long.',
    );
  } else {
    data.text = input.text.trim();
    data.is_url = validator.isURL(data.text, {
      protocols: ['http', 'https'],
    });
  }

  return data;
}
