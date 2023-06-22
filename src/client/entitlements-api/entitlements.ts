import {
  AuthenticatedUser,
  License,
  LicenseService,
  User,
  header,
} from '../service';
import { deleteSeatsById, getSeats, postSeats } from './entitlements-service';
import { listPrincipals } from './rbac';
import { Principal } from './rbac';

export class EntitlementsService implements LicenseService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || '';
  }

  private async requestHeader(user: AuthenticatedUser) {
    return await header(user.token, this.baseUrl);
  }

  async get(user: AuthenticatedUser): Promise<License> {
    const result = await getSeats(
      {
        limit: 10,
        offset: 0,
      },
      await this.requestHeader(user)
    );
    const available = result.allowed || 0;
    const total = available - (result.consumed || 0);
    return {
      available,
      total,
    };
  }

  async seats(
    user: AuthenticatedUser,
    assigned: boolean | undefined = true
  ): Promise<User[]> {
    if (assigned) {
      const result = await getSeats({}, await this.requestHeader(user));

      return result.data.map(({ subscription_id, account_username }) => ({
        id: subscription_id || '',
        name: account_username || '',
        assigned: true,
      }));
    } else {
      const header = await this.requestHeader(user);
      const result = await listPrincipals({ usernameOnly: false }, header);

      return (result.data as Principal[]).map(
        ({ username, first_name, last_name }) => ({
          id: username,
          name: `${first_name} ${last_name}`,
          assigned: false,
        })
      );
    }
  }

  async assign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    await Promise.all(
      userIds.map(async (id) =>
        postSeats({ account_username: id }, await this.requestHeader(user))
      )
    );
    return Promise.resolve();
  }

  async unAssign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    await Promise.all(
      userIds.map(async (id) =>
        deleteSeatsById(id, await this.requestHeader(user))
      )
    );
    return Promise.resolve();
  }
}
