import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import type { VoidFunctionComponent } from 'react';

export type EmptyStateNoAssignedSeatProps = {
  totalSeats: number;
  onAddUsers: () => void;
};

export const EmptyStateNoAssignedSeat: VoidFunctionComponent<
  EmptyStateNoAssignedSeatProps
> = ({ totalSeats, onAddUsers }) => {
  return (
    <EmptyState isFullHeight={true}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h2" size="lg">
        There are currently no users in your organization assigned seats.
        <br />
        Your organization has {totalSeats} seats available.
      </Title>
      <EmptyStateBody>
        Please add users by using the button below.
      </EmptyStateBody>
      <Button
        ouiaId="button-create"
        variant="primary"
        onClick={() => onAddUsers()}
      >
        Add users
      </Button>
    </EmptyState>
  );
};
