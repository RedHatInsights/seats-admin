import {
  AuthenticatedUser,
  License,
  LicenseService,
  Pagination,
  UserResult,
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
    return await header(user.token, this.baseUrl + 'api/entitlements/v1/');
  }

  async get(user: AuthenticatedUser, pagination: Pagination): Promise<License> {
    const result = await getSeats(
      {
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
      },
      await this.requestHeader(user)
    );
    const allowed = result.allowed || 0;
    const consumed = result.consumed || 0;
    return {
      available: allowed - consumed,
      total: allowed,
    };
  }

  async seats(
    user: AuthenticatedUser,
    pagination: Pagination,
    assigned: boolean | undefined = true
  ): Promise<UserResult> {
    if (assigned) {
      const result = await getSeats(
        {
          limit: pagination.perPage,
          offset: (pagination.page - 1) * pagination.perPage,
          status: ['Active'],
        },
        await this.requestHeader(user)
      );

      return {
        users: result.data.map((user) => ({
          id: user.subscription_id || '',
          userName: user.account_username || '',
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          assigned: true,
        })),
        count: result.meta?.count || 0,
      };
    } else {
      const header = await this.requestHeader(user);
      const result = await listPrincipals(
        { usernameOnly: false },
        { ...header, baseUrl: this.baseUrl + 'api/rbac/v1/' }
      );

      return {
        users: (result.data as Principal[]).map(
          ({ username, first_name, last_name }) => ({
            id: username,
            firstName: first_name || '',
            lastName: last_name || '',
            userName: username,
            assigned: false,
          })
        ),
        count: result.meta?.count || 0,
      };
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
