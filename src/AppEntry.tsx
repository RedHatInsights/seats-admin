import { I18nProvider } from '@rhoas/app-services-ui-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import App from './App';
import { init } from './store';

const queryClient = new QueryClient();

const AppEntry = () => (
  <Provider
    store={init(
      ...(process.env.NODE_ENV !== 'production' ? [logger] : [])
    ).getStore()}
  >
    <QueryClientProvider client={queryClient}>
      <I18nProvider
        lng={'en'}
        debug={true}
        resources={{
          en: {
            common: () =>
              import(
                '@rhoas/app-services-ui-components/locales/en/common.json'
              ),
          },
        }}
      >
        <App />
      </I18nProvider>
    </QueryClientProvider>
  </Provider>
);

export default AppEntry;
