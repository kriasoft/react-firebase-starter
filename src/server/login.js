/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import Router from 'express';
import passport from './passport';

const router = new Router();

router.use(passport.initialize());

router.get('/login/:provider(facebook)', (req, res, next) => {
  passport.authenticate(req.params.provider)(req, res, next);
});

router.get('/login/:provider(facebook)/return', (req, res, next) => {
  passport.authenticate('facebook', {
    successRedirect: '/login?success',
    failureRedirect: '/login?error=something+went+wrong',
  })(req, res, next);
});

router.post('/login/clear', (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

export default router;
