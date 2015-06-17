/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import 'babel/polyfill';
import router from './router';

const container = document.getElementById('app');

router.render('/', container);
