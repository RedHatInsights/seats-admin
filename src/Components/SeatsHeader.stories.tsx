import { Page, PageSection } from '@patternfly/react-core';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { SeatsHeader } from './SeatsHeader';

export default {
  component: SeatsHeader,
  args: {},
} as ComponentMeta<typeof SeatsHeader>;

const Template: ComponentStory<typeof SeatsHeader> = (args) => (
  <Page>
    <SeatsHeader {...args} />
    <PageSection>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi
      at doloremque eius eum facere illum iste labore laboriosam, minima
      molestias nisi quam quibusdam quos repellendus, sint vero vitae
      voluptatum!
    </PageSection>
  </Page>
);

export const NoSubscription = Template.bind({});
NoSubscription.args = {
  availableSeats: 0,
  totalSeats: 0,
};

export const SeatsAvailable = Template.bind({});
SeatsAvailable.args = {
  availableSeats: 5,
  totalSeats: 10,
};

export const ZeroSeatsAvailable = Template.bind({});
ZeroSeatsAvailable.args = {
  availableSeats: 0,
  totalSeats: 10,
};
