import { AuthenticatedUser, License, LicenseService, User } from "./service";

type MockUser = {
  username: string;
  firstName: string;
  lastName: string;
};

type MockLicense = {
  totalSeats: number;
  availableSeats: number;
  assignedSeats: number;
};

export class MockService implements LicenseService {
  async get(user: AuthenticatedUser): Promise<License> {
    const { totalSeats, availableSeats }: MockLicense = await (
      await fetch("/aw-api/subscriptions")
    ).json();
    return {
      total: totalSeats,
      available: availableSeats,
    };
  }

  async seats(
    { orgId, serviceId }: AuthenticatedUser,
    assigned?: boolean | undefined
  ): Promise<User[]> {
    return (await (await fetch("/aw-api/users")).json()).users.map(
      ({ username, firstName, lastName }: MockUser) => ({
        id: username,
        name: `${firstName} ${lastName}`,
      })
    );
  }

  assign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    return Promise.resolve();
  }

  unAssign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    return Promise.resolve();
  }
}
