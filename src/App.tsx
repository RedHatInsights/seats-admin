import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';

import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Reducer } from 'redux';
import './App.scss';

import { Routes } from './Routes';

const App = () => {
  const { updateDocumentTitle, on } = useChrome();
  const history = useHistory();

  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer as Reducer });
    // You can use directly the name of your app
    updateDocumentTitle('Starter app');

    const unregister = on('APP_NAVIGATION', (event) => {
      console.dir(event);
      if (event.navId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        history.push(event.navId);
      }
    });
    return () => {
      if (unregister) {
        unregister();
      }
    };
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes />
    </Fragment>
  );
};

export default App;
