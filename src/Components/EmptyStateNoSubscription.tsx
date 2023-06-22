import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Icon,
  Title,
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import type { VoidFunctionComponent } from 'react';

const DangerIcon: VoidFunctionComponent = () => (
  <Icon status={'danger'} size={'xl'}>
    <ExclamationCircleIcon />
  </Icon>
);

export const EmptyStateNoSubscription: VoidFunctionComponent = () => {
  return (
    <EmptyState isFullHeight={true}>
      <EmptyStateIcon component={DangerIcon} variant={'container'} />
      <Title headingLevel="h2" size="lg">
        Your organization no longer has an Seats Administration subscription.
      </Title>
      <EmptyStateBody>
        Please contact Red Hat if there is an issue with your subscription or if
        you wish to continue.
      </EmptyStateBody>
    </EmptyState>
  );
};
