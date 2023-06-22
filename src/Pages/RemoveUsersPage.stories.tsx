import type { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { RemoveUsersPage as RemoveUsersPageComp } from './RemoveUsersPage';
import { ServiceContextProvider } from '../Components/ServiceProvider';

export default {
  component: RemoveUsersPageComp,
  args: {},
} as Meta<typeof RemoveUsersPageComp>;

const Template: StoryFn<typeof RemoveUsersPageComp> = (args) => (
  <ServiceContextProvider serviceName="mock">
    <RemoveUsersPageComp {...args} />
  </ServiceContextProvider>
);

export const RemoveUsersPage = Template.bind({});
RemoveUsersPage.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            total: 5,
            available: 1,
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
                name: `John ${i} Woo ${i}`,
                assigned: true,
              }))
          )
        );
      }),
    ],
  },
};
