import { Page } from '@patternfly/react-core';
import { useSortableSearchParams } from '@rhoas/app-services-ui-components';
import type { Meta, StoryFn } from '@storybook/react';
import {
  Columns,
  UsersWithSeatTable as UsersWithSeatTableComponent,
  labels,
} from './UsersWithSeatTable';

export default {
  component: UsersWithSeatTableComponent,
  args: {
    getUrlForUser: () => '',
    usernames: [],
    availableSeats: 5,
    totalSeats: 10,
    canAddUser: true,
    isUserChecked: () => false,
  },
} as Meta<typeof UsersWithSeatTableComponent>;

const Template: StoryFn<typeof UsersWithSeatTableComponent> = (args) => {
  const [isColumnSortable] = useSortableSearchParams(Columns, labels, 'name');
  return (
    <Page>
      <UsersWithSeatTableComponent
        isColumnSortable={isColumnSortable}
        {...args}
      />
    </Page>
  );
};

export const FirstLoadShowsSpinner = Template.bind({});
FirstLoadShowsSpinner.args = {
  users: null,
};

export const LoadingDataAfterFilteringShowsASkeleton = Template.bind({});
LoadingDataAfterFilteringShowsASkeleton.args = {
  users: undefined,
  usernames: ['foo'],
};

export const NoInitialDataShowsTheRightEmptyState = Template.bind({});
NoInitialDataShowsTheRightEmptyState.args = {
  users: [],
};

export const NoDataWithAFilterShowsTheRightEmptyState = Template.bind({});
NoDataWithAFilterShowsTheRightEmptyState.args = {
  users: [],
  usernames: ['foo'],
};

export const SomeUsers = Template.bind({});
SomeUsers.args = {
  users: [
    {
      id: 'FooBar1',
      name: 'Foo1',
      assigned: true,
    },
    {
      id: 'FooBar2',
      name: 'Foo2',
      assigned: true,
    },
    {
      id: 'FooBar3',
      name: 'Foo3',
      assigned: true,
    },
    {
      id: 'FooBar4',
      name: 'Foo4',
      assigned: true,
    },
  ],
  page: 1,
  itemCount: 5,
  usernames: ['foo'],
};

export const SomeUsersWithPagination = Template.bind({});
SomeUsersWithPagination.args = {
  users: [
    {
      id: 'FooBar1',
      name: 'Foo1',
      assigned: true,
    },
    {
      id: 'FooBar2',
      name: 'Foo2',
      assigned: true,
    },
    {
      id: 'FooBar3',
      name: 'Foo3',
      assigned: true,
    },
    {
      id: 'FooBar4',
      name: 'Foo4',
      assigned: true,
    },
    {
      id: 'FooBar1',
      name: 'Foo1',
      assigned: true,
    },
    {
      id: 'FooBar2',
      name: 'Foo2',
      assigned: true,
    },
    {
      id: 'FooBar3',
      name: 'Foo3',
      assigned: true,
    },
    {
      id: 'FooBar4',
      name: 'Foo4',
      assigned: true,
    },
    {
      id: 'FooBar10',
      name: 'Foo10',
      assigned: true,
    },
    {
      id: 'FooBar2',
      name: 'Foo2',
      assigned: true,
    },
    {
      id: 'FooBar30',
      name: 'Foo30',
      assigned: true,
    },
    {
      id: 'FooBar4',
      name: 'Foo4',
      assigned: true,
    },
    {
      id: 'FooBar1',
      name: 'Foo1',
      assigned: true,
    },
    {
      id: 'FooBar2',
      name: 'Foo2',
      assigned: true,
    },
    {
      id: 'FooBar3',
      name: 'Foo3',
      assigned: true,
    },
    {
      id: 'FooBar4',
      name: 'Foo4',
      assigned: true,
    },
  ],
  page: 1,
  itemCount: 56,
  usernames: ['foo'],
};

export const CantAddUsers = Template.bind({});
CantAddUsers.args = {
  ...SomeUsersWithPagination.args,
  canAddUser: false,
};
