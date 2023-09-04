const Dotenv = require('dotenv-webpack');

module.exports = {
  appUrl: '/ansible/seats-administration',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  sassPrefix: '.seats-admin-ui, .seatsAdminUi',
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [new Dotenv()],
  _unstableHotReload: process.env.HOT === 'true',
  moduleFederation: {
    exclude: ['react-router-dom'],
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          requiredVersion: '^6.3.0',
        },
      },
    ],
  },
  routes: {
    '/v1alpha': {
      host: 'https://ciam-authz-hw-ciam-authz--runtime-ext.apps.ext.spoke.preprod.us-east-1.aws.paas.redhat.com/',
    },
    '/aw-api': {
      host: 'http://localhost:3000',
    },
  },
};
