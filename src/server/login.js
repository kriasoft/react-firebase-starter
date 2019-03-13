/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import Router from 'express';
import passport from './passport';

const router = new Router();

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/login/google/return',
  passport.authenticate('google', {
    successRedirect: '/login?success',
    failureRedirect: '/login?error=something+went+wrong',
  }),
);

router.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
);

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    successRedirect: '/login?success',
    failureRedirect: '/login?error=something+went+wrong',
  }),
);

router.post('/login/clear', (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

export default router;
