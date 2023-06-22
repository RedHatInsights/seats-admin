import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import type { VoidFunctionComponent } from 'react';

export type EmptyStateNoResultsProps = {
  onClearAllFilters: () => void;
};

export const EmptyStateNoResults: VoidFunctionComponent<
  EmptyStateNoResultsProps
> = ({ onClearAllFilters }) => {
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        No results found
      </Title>
      <EmptyStateBody>
        Adjust your filters and try again, or&nbsp;
        <a onClick={onClearAllFilters}>clear all filters</a>.
      </EmptyStateBody>
    </EmptyState>
  );
};
