import { Page, PageSection } from '@patternfly/react-core';
import type { Meta, StoryFn } from '@storybook/react';
import { AddUsersHeader as AddUsersHeaderComponent } from './AddUsersHeader';

export default {
  component: AddUsersHeaderComponent,
  args: {
    isAddDisabled: false,
    seatsAvailable: 5,
  },
} as Meta<typeof AddUsersHeaderComponent>;

const Template: StoryFn<typeof AddUsersHeaderComponent> = (args) => (
  <Page>
    <AddUsersHeaderComponent {...args} />
    <PageSection>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi
      at doloremque eius eum facere illum iste labore laboriosam, minima
      molestias nisi quam quibusdam quos repellendus, sint vero vitae
      voluptatum!
    </PageSection>
  </Page>
);

export const AddUsersHeader = Template.bind({});
AddUsersHeader.args = {};

export const AddUsersHeaderDisabledAdd = Template.bind({});
AddUsersHeaderDisabledAdd.args = {
  isAddDisabled: true,
};
