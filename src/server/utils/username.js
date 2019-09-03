/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import db from '../db';

const USERNAME_REGEX = /^(?=.{2,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export function isValidUsername(username) {
  return Boolean(username && username.match(USERNAME_REGEX));
}

export async function generateUsername(email) {
  let username;

  // Extract username from the email address if it's available
  if (email) {
    [username = ''] = email.split('@');
    username = username
      .replace(/\+/g, '_')
      .replace(/(^[._]+|[._]+$|[^a-zA-Z0-9._])/g, '');
  }

  // Generate random username as a fallback
  if (!username) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    username = '';

    for (let i = 0; i < 7; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  // Verify that the username is unique
  const {
    rows: [{ exists }],
  } = await db.raw('SELECT exists (SELECT * FROM users WHERE username = ?)', [
    username,
  ]);

  return exists ? generateUsername() : username;
}
