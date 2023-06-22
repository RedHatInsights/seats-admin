import type { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { ServiceContextProvider } from '../Components/ServiceProvider';
import { UsersPage } from './UsersPage';

export default {
  component: UsersPage,
  args: {},
} as Meta<typeof UsersPage>;

const Template: StoryFn<typeof UsersPage> = (args) => (
  <ServiceContextProvider serviceName="mock">
    <UsersPage {...args} />
  </ServiceContextProvider>
);

export const NoSubscription = Template.bind({});
NoSubscription.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            total: 0,
            available: 0,
          })
        );
      }),
      rest.get('/aw-api/users', (req, res, ctx) => {
        return res(ctx.delay(450), ctx.json([]));
      }),
    ],
  },
};

export const SeatsAvailable = Template.bind({});
SeatsAvailable.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            totalSeats: 10,
            availableSeats: 5,
            assignedSeats: 5,
          })
        );
      }),
      rest.get('/aw-api/users', (req, res, ctx) => {
        return res(
          ctx.delay(450),
          ctx.json(
            Array(5)
              .fill(0)
              .map((_, i) => ({
                id: `${i}`,
                name: `John ${i} Woo`,
                assigned: true,
              }))
          )
        );
      }),
    ],
  },
};

export const ZeroSeatsAvailable = Template.bind({});
ZeroSeatsAvailable.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            total: 30,
            available: 0,
          })
        );
      }),
      rest.get('/aw-api/users', (req, res, ctx) => {
        return res(
          ctx.delay(450),
          ctx.json(
            Array(30)
              .fill(0)
              .map((_, i) => ({
                id: `${i}`,
                name: `John ${i} Woo`,
                assigned: true,
              }))
          )
        );
      }),
    ],
  },
};

export const NegativeSeats = Template.bind({});
NegativeSeats.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            total: 5,
            available: -2,
          })
        );
      }),
      rest.get('/aw-api/users', (req, res, ctx) => {
        return res(
          ctx.delay(450),
          ctx.json(
            Array(10)
              .fill(0)
              .map((_, i) => ({
                id: `${i}`,
                name: `John ${i} Woo`,
                assigned: true,
              }))
          )
        );
      }),
    ],
  },
};
