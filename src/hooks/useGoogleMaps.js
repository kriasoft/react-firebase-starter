/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { useConfig } from './useConfig';

let promise;

export function useGoogleMaps(cb) {
  const { gcpServiceKey: key } = useConfig();

  React.useEffect(() => {
    if (promise) {
      promise.then(cb);
    } else {
      promise = new Promise(resolve => {
        window.initGoogleMaps = () => resolve(window.google.maps);
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initGoogleMaps`; // prettier-ignore
        document.head.appendChild(script);
      });
      promise.then(cb);
    }
  }, []);
}
