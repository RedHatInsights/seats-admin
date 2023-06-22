import { Page } from '@patternfly/react-core';
import type { Meta, StoryFn } from '@storybook/react';
import { EmptyStateNoSubscription as EmptyStateNoSubscriptionComponent } from './EmptyStateNoSubscription';

export default {
  component: EmptyStateNoSubscriptionComponent,
  args: {},
} as Meta<typeof EmptyStateNoSubscriptionComponent>;

const Template: StoryFn<typeof EmptyStateNoSubscriptionComponent> = (args) => (
  <Page>
    <EmptyStateNoSubscriptionComponent {...args} />
  </Page>
);

export const EmptyStateNoSubscription = Template.bind({});
