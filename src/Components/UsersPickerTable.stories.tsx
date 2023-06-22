import { Page } from '@patternfly/react-core';
import { useSortableSearchParams } from '@rhoas/app-services-ui-components';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import {
  Columns,
  UsersPickerTable as UsersPickerTableComponent,
  labels,
} from './UsersPickerTable';

export default {
  component: UsersPickerTableComponent,
  args: {
    usernames: [],
  },
} as Meta<typeof UsersPickerTableComponent>;

const Template: StoryFn<typeof UsersPickerTableComponent> = (args) => {
  const [isColumnSortable] = useSortableSearchParams(Columns, labels, 'name');
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  return (
    <Page>
      <UsersPickerTableComponent
        isColumnSortable={isColumnSortable}
        {...args}
        isUserChecked={(user) => checkedUsers.includes(user.name)}
        onCheckUser={(user, isChecked) => {
          setCheckedUsers(
            isChecked
              ? [...checkedUsers, user.name]
              : checkedUsers.filter((u) => u !== user.name)
          );
        }}
      />
    </Page>
  );
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
      id: 'FooBar5',
      name: 'Foo5',
      assigned: true,
    },
    {
      id: 'FooBar6',
      name: 'Foo6',
      assigned: true,
    },
    {
      id: 'FooBar7',
      name: 'Foo7',
      assigned: true,
    },
  ],
  page: 1,
  itemCount: 56,
  usernames: ['foo'],
};
