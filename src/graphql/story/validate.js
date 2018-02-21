/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import validator from 'validator';

export default function validate(input: any) {
  const data = {};
  const errors = [];

  if (!input.title) {
    errors.push({
      key: 'title',
      message: 'The title field cannot be empty.',
    });
  } else if (!validator.isLength(input.title.trim(), 5, 80)) {
    errors.push({
      key: 'title',
      message: 'The title must be between 5 and 80 characets long.',
    });
  } else {
    data.title = input.title.trim();
  }

  if (!input.text) {
    errors.push({
      key: 'text',
      message: 'The text or URL field cannot be empty.',
    });
  } else if (!validator.isLength(input.text.trim(), 10, 1000)) {
    errors.push({
      key: 'text',
      message:
        'The text or URL field must be between 10 and 1000 characters long.',
    });
  } else {
    data.text = input.text.trim();
    data.isURL = validator.isURL(data.text, {
      protocols: ['http', 'https'],
    });
  }

  return { data, errors };
}
