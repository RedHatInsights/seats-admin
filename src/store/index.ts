/* eslint-disable no-unused-vars */
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import type ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import type { Middleware, Reducer } from 'redux';

export let registry: ReducerRegistry<Reducer>;

export function init(...middleware: Middleware[]) {
  registry = getRegistry({}, [
    promiseMiddleware,
    notificationsMiddleware({ errorDescriptionKey: ['detail', 'stack'] }),
    ...middleware,
  ]);
  return registry;
}
