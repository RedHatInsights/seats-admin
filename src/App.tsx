import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';

import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import React, { Fragment, useEffect } from 'react';
import { Reducer } from 'redux';
import './App.scss';

import { AppRoutes } from './AppRoutes';

const App = () => {
  const { updateDocumentTitle } = useChrome();

  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer as Reducer });
    // You can use directly the name of your app
    updateDocumentTitle('Ansible Lightspeed with IBM watsonx Code Assistant');
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <AppRoutes />
    </Fragment>
  );
};

export default App;
