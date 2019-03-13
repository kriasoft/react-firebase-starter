/**
 * Application settings to be used in the React app that will be
 * available on the context. For example:
 *
 *   import { useConfig } from '../hooks';
 *
 *   function Title() {
 *     const { appName } = useConfig();
 *     return <h1>{appName}</h1>
 *   }
 *
 * IMPORTANT NOTE: Do not include any sensitive data into this file!
 */
export default {
  // Core application settings
  appName: process.env.APP_NAME,
  appDescription: process.env.APP_DESCRIPTION,
  appOrigin: process.env.APP_ORIGIN,

  // Firebase
  // https://firebase.google.com/docs/web/setup
  firebase: {
    projectId: process.env.GCP_PROJECT,
    authDomain: process.env.APP_ORIGIN.startsWith('http://localhost')
      ? `${process.env.GCP_PROJECT}.firebaseapp.com`
      : process.env.APP_ORIGIN.replace(/^https?:\/\//, ''),
    apiKey: process.env.GCP_BROWSER_KEY,
  },

  // Analytics
  gaTrackingId: process.env.GA_TRACKING_ID,
};
