import { Page } from '@patternfly/react-core';
import type { Meta, StoryFn } from '@storybook/react';
import { EmptyStateNoAssignedSeat as EmptyStateNoAssignedSeatComponent } from './EmptyStateNoAssignedSeat';

export default {
  component: EmptyStateNoAssignedSeatComponent,
  args: {},
} as Meta<typeof EmptyStateNoAssignedSeatComponent>;

const Template: StoryFn<typeof EmptyStateNoAssignedSeatComponent> = (args) => (
  <Page>
    <EmptyStateNoAssignedSeatComponent {...args} />
  </Page>
);

export const EmptyStateNoAssignedSeat = Template.bind({});
EmptyStateNoAssignedSeat.args = {
  totalSeats: 10,
};
