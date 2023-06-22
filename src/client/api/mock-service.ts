import { License, LicenseService, User } from '../service';

type MockLicense = {
  totalSeats: number;
  availableSeats: number;
  assignedSeats: number;
};

export class MockService implements LicenseService {
  async get(): Promise<License> {
    const { totalSeats, availableSeats }: MockLicense = await (
      await fetch('/aw-api/subscriptions')
    ).json();
    return {
      total: totalSeats,
      available: availableSeats,
    };
  }

  async seats(): Promise<User[]> {
    return await (await fetch('/aw-api/users')).json();
  }

  assign(): Promise<void> {
    return Promise.resolve();
  }

  unAssign(): Promise<void> {
    return Promise.resolve();
  }
}
