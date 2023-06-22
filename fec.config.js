const Dotenv = require('dotenv-webpack');

module.exports = {
  appUrl: '/ansible/seats',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [
    new Dotenv(),
  ],
  _unstableHotReload: process.env.HOT === 'true',
  moduleFederation: {
    shared: [],
  },
  routes: {
    '/v1alpha': {
      host: 'https://ciam-authz-hw-ciam-authz--runtime-ext.apps.ext.spoke.preprod.us-east-1.aws.paas.redhat.com/'
    },
    '/api/entitlements/v1': {
      host: 'https://cloud.redhat.com/'
    },
    '/aw-api': {
      host: 'http://localhost:3000',
    },
  },
};
