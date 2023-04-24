import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";

import { CheckRequestBuilderPostRequestConfiguration } from "./api/v1alpha/check/checkRequestBuilderPostRequestConfiguration";
import { AuthenticatedUser, License, LicenseService, User } from "./service";
import { Licenses_serviceId_body } from "./api/models";
import { Authz } from "./api/authz";

export class CiamAuthz implements LicenseService {
  private client: Authz;
  private requestConfiguration;

  constructor(baseUrl?: string) {
    const adapter = new FetchRequestAdapter(
      new AnonymousAuthenticationProvider()
    );
    adapter.baseUrl = baseUrl || "";
    this.client = new Authz(adapter);
    this.requestConfiguration =
      new CheckRequestBuilderPostRequestConfiguration();
    this.requestConfiguration.headers = { Authorization: ["token"] };
  }

  async get({ orgId, serviceId }: AuthenticatedUser): Promise<License> {
    const result = await this.client.v1alpha
      .orgsById(orgId)
      .licensesById(serviceId)
      .get(this.requestConfiguration);
    return {
      available: result?.seatsAvailable || 0,
      total: result?.seatsTotal || 0,
    };
  }

  async seats(
    { orgId, serviceId }: AuthenticatedUser,
    assigned: boolean | undefined = true
  ): Promise<User[]> {
    const result = await this.client.v1alpha
      .orgsById(orgId)
      .licensesById(serviceId)
      .seats.get({
        headers: this.requestConfiguration.headers,
        queryParameters: { filter: assigned ? "assigned" : "assignable" },
      });
    return (
      result?.users?.map(({ id, displayName, assigned }) => ({
        id: id || "",
        name: displayName || "",
        assigned: !!assigned,
      })) || []
    );
  }

  async assign(
    user: AuthenticatedUser,
    userIds: string[]
  ): Promise<void> {
    const body = new Licenses_serviceId_body();
    body.assign = userIds;
    await this.modify(user, body);
    return;
  }

  async unAssign(
    user: AuthenticatedUser,
    userIds: string[]
  ): Promise<void> {
    const body = new Licenses_serviceId_body();
    body.unassign = userIds;
    await this.modify(user, body);
    return;
  }

  private async modify(
    { orgId, serviceId }: AuthenticatedUser,
    body: Licenses_serviceId_body
  ): Promise<void> {
    this.client.v1alpha
      .orgsById(orgId)
      .licensesById(serviceId)
      .post(body, this.requestConfiguration);
  }
}
