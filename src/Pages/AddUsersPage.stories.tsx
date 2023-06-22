import type { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { AddUsersPage as AddUsersPageComp } from './AddUsersPage';
import { ServiceContextProvider } from '../Components/ServiceProvider';

export default {
  component: AddUsersPageComp,
  args: {},
} as Meta<typeof AddUsersPageComp>;

const Template: StoryFn<typeof AddUsersPageComp> = (args) => (
  <ServiceContextProvider serviceName="mock">
    <AddUsersPageComp {...args} />
  </ServiceContextProvider>
);

export const AddUsersPage = Template.bind({});
AddUsersPage.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            total: 10,
            available: 5,
          })
        );
      }),
      rest.get('/aw-api/users', (req, res, ctx) => {
        return res(
          ctx.delay(450),
          ctx.json(
            Array(20)
              .fill(0)
              .map((_, i) => ({
                id: `${i}`,
                name: `Bob ${i} Brown`,
                assigned: true,
              }))
          )
        );
      }),
    ],
  },
};
