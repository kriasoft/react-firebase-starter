/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import 'babel/polyfill';
import React from 'react';
import FastClick from 'fastclick';
import dispatcher from './core/dispatcher.js';
import router from './router.js';
import location from './core/location.js';
import ActionTypes from './constants/ActionTypes.js';

const container = document.body;
const context = {
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    let elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    let meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
};

function run() {
  const currentPath = window.location.pathname || '/';
  router.dispatch({ path: currentPath }, (state, component) => {
    React.render(component, container);
  });

  dispatcher.register(action => {
    if (action.type === ActionTypes.CHANGE_LOCATION) {
      router.dispatch({ path: action.path, context: context }, (state, component) => {
        React.render(component, container);
      });
    }
  });
}

function handlePopState(event) {
  location.navigateTo(window.location.pathname, { replace: !!event.state });
}

// Run the application when both DOM is ready
// and page content is loaded
new Promise(resolve => {
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', resolve);
    window.addEventListener('popstate', handlePopState);
  } else {
    window.attachEvent('onload', resolve);
    window.attachEvent('popstate', handlePopState);
  }
}).then(() => FastClick.attach(document.body)).then(run);
