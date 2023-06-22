/**
 * Role Based Access Control
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from 'oazapfts/lib/runtime';
import * as QS from 'oazapfts/lib/runtime/query';
export const defaults: Oazapfts.RequestOpts = {
  baseUrl: '/api/rbac/v1',
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
  server1: '/api/rbac/v1',
};
export type PaginationMeta = {
  count?: number;
};
export type PaginationLinks = {
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
};
export type ListPagination = {
  meta?: PaginationMeta;
  links?: PaginationLinks;
};
export type CrossAccountRequest = {
  request_id?: string;
  target_account?: string;
  target_org?: string;
  status?: string;
  created?: string;
  start_date?: any;
  end_date?: any;
};
export type CrossAccountRequestByAccount = CrossAccountRequest & {
  first_name?: string;
  last_name?: string;
  email?: string;
};
export type CrossAccountRequestByUserId = CrossAccountRequest & {
  user_id?: string;
};
export type CrossAccountRequestPagination = ListPagination & {
  data: (CrossAccountRequestByAccount | CrossAccountRequestByUserId)[];
};
export type Error403 = {
  errors: {
    detail?: string;
    source?: string;
    status?: string;
  }[];
};
export type Error = {
  errors: {
    detail?: string;
    status?: string;
  }[];
};
export type CrossAccountRequestIn = {
  target_account: string;
  target_org?: string;
  start_date: string;
  end_date: string;
  roles: string[];
};
export type Permission = {
  application?: string;
  resource_type?: string;
  verb?: string;
  permission?: string;
  description?: string;
};
export type CrossAccountRequestWithRoles = {
  request_id?: string;
  target_account?: string;
  target_org?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  created?: string;
  roles?: {
    display_name?: string;
    description?: string;
    permissions?: Permission[];
  }[];
};
export type CrossAccountRequestOut = CrossAccountRequestWithRoles & {
  user_id?: string;
};
export type CrossAccountRequestDetailByAccount =
  CrossAccountRequestWithRoles & {
    first_name?: any;
    last_name?: any;
    email?: any;
  };
export type CrossAccountRequestDetailByUseId = CrossAccountRequestWithRoles & {
  user_id?: any;
};
export type CrossAccountRequestDetail =
  | CrossAccountRequestDetailByAccount
  | CrossAccountRequestDetailByUseId;
export type CrossAccountRequestUpdateIn = {
  start_date: string;
  end_date: string;
  roles: string[];
};
export type CrossAccountRequestPatch = {
  start_date?: string;
  end_date?: string;
  roles?: string[];
  status?: 'pending' | 'approved' | 'expired' | 'cancelled' | 'denied';
};
export type Status = {
  api_version: number;
  commit?: string;
};
export type Principal = {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  is_org_admin?: boolean;
};
export type PrincipalMinimal = {
  username: string;
};
export type PrincipalPagination = ListPagination & {
  data: (Principal | PrincipalMinimal)[];
};
export type Group = {
  name: string;
  description?: string;
};
export type Uuid = {
  uuid: string;
};
export type Timestamped = {
  created: string;
  modified: string;
};
export type GroupOut = Group &
  Uuid &
  Timestamped & {
    principalCount?: number;
    roleCount?: number;
    system?: boolean;
    platform_default?: boolean;
    admin_default?: boolean;
  };
export type GroupPagination = ListPagination & {
  data: GroupOut[];
};
export type Role = {
  name: string;
  display_name?: string;
  description?: string;
};
export type RoleOut = Role &
  Uuid &
  Timestamped & {
    policyCount?: number;
    accessCount?: number;
    applications?: string[];
    system?: boolean;
    platform_default?: boolean;
    admin_default?: boolean;
    external_role_id?: string;
    external_tenant?: string;
  };
export type GroupWithPrincipalsAndRoles = Group &
  Uuid &
  Timestamped & {
    principals: Principal[];
    roles: RoleOut[];
  };
export type PrincipalIn = {
  username: string;
};
export type GroupPrincipalIn = {
  principals: PrincipalIn[];
};
export type ErrorNotFound = {
  errors: {
    detail?: string;
    status?: string;
    source?: string;
  }[];
};
export type GroupRolesPagination = ListPagination & {
  data: RoleOut[];
};
export type GroupRoleIn = {
  roles: string[];
};
export type ResourceDefinitionFilter = {
  key: string;
  operation: 'equal' | 'in';
  value: string;
};
export type ResourceDefinition = {
  attributeFilter: ResourceDefinitionFilter;
};
export type Access = {
  permission: string;
  resourceDefinitions: ResourceDefinition[];
};
export type RoleIn = Role & {
  access: Access[];
};
export type RoleWithAccess = RoleOut & {
  access: Access[];
};
export type AdditionalGroup = {
  name?: string;
  description?: string;
  uuid?: string;
};
export type RoleOutDynamic = Role &
  Uuid &
  Timestamped & {
    policyCount: number;
    accessCount: number;
    applications: string[];
    system: boolean;
    platform_default: boolean;
    admin_default: boolean;
    groups_in_count?: number;
    groups_in?: AdditionalGroup[];
    external_role_id?: string;
    external_tenant?: string;
    access?: Access[];
  };
export type RolePaginationDynamic = ListPagination & {
  data: RoleOutDynamic[];
};
export type RolePatch = {
  name?: string;
  display_name?: string;
  description?: string;
};
export type AccessPagination = ListPagination & {
  data: Access[];
};
export type Policy = {
  name: string;
  description?: string;
};
export type PolicyIn = Policy & {
  group: string;
  roles: string[];
};
export type PolicyExtended = Policy &
  Uuid &
  Timestamped & {
    group: GroupOut;
    roles: RoleOut[];
  };
export type PolicyPagination = ListPagination & {
  data: PolicyExtended[];
};
export type PermissionPagination = ListPagination & {
  data: Permission[];
};
export type PermissionOptionsPagination = ListPagination & {
  data: string[];
};
/**
 * List the cross account requests for a user or account
 */
export function listCrossAccountRequests(
  {
    limit,
    offset,
    queryBy,
    account,
    orgId,
    approvedOnly,
    status,
    orderBy,
  }: {
    limit?: number;
    offset?: number;
    queryBy?: 'user_id' | 'target_org';
    account?: string;
    orgId?: string;
    approvedOnly?: 'true';
    status?: 'pending' | 'approved' | 'denied' | 'cancelled' | 'expired';
    orderBy?:
      | 'request_id'
      | 'start_date'
      | 'end_date'
      | 'created'
      | 'modified'
      | 'status';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: CrossAccountRequestPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/cross-account-requests/${QS.query(
        QS.explode({
          limit,
          offset,
          query_by: queryBy,
          account,
          org_id: orgId,
          approved_only: approvedOnly,
          status,
          order_by: orderBy,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Create a cross account request
 */
export function createCrossAccountRequests(
  crossAccountRequestIn: CrossAccountRequestIn,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 201;
          data: CrossAccountRequestOut;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      '/cross-account-requests/',
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: crossAccountRequestIn,
      })
    )
  );
}
/**
 * Get a cross account request
 */
export function getCrossAccountRequest(
  uuid: string,
  {
    queryBy,
    account,
    approvedOnly,
  }: {
    queryBy?: 'user_id' | 'target_org';
    account?: string;
    approvedOnly?: 'true';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: CrossAccountRequestDetail;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/cross-account-requests/${encodeURIComponent(uuid)}/${QS.query(
        QS.explode({
          query_by: queryBy,
          account,
          approved_only: approvedOnly,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Update a cross account request
 */
export function putCrossAccountRequest(
  uuid: string,
  crossAccountRequestUpdateIn: CrossAccountRequestUpdateIn,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: CrossAccountRequestDetail;
        }
      | {
          status: 201;
          data: CrossAccountRequestOut;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/cross-account-requests/${encodeURIComponent(uuid)}/`,
      oazapfts.json({
        ...opts,
        method: 'PUT',
        body: crossAccountRequestUpdateIn,
      })
    )
  );
}
/**
 * Patch a cross account request
 */
export function patchCrossAccountRequest(
  uuid: string,
  crossAccountRequestPatch: CrossAccountRequestPatch,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: CrossAccountRequestDetail;
        }
      | {
          status: 201;
          data: CrossAccountRequestOut;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/cross-account-requests/${encodeURIComponent(uuid)}/`,
      oazapfts.json({
        ...opts,
        method: 'PATCH',
        body: crossAccountRequestPatch,
      })
    )
  );
}
/**
 * Obtain server status
 */
export function getStatus(opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: Status;
        }
      | {
          status: 500;
          data: Error;
        }
    >('/status/', {
      ...opts,
    })
  );
}
/**
 * List the principals for a tenant
 */
export function listPrincipals(
  {
    limit,
    offset,
    matchCriteria,
    usernames,
    sortOrder,
    email,
    status,
    adminOnly,
    orderBy,
    usernameOnly,
  }: {
    limit?: number;
    offset?: number;
    matchCriteria?: 'partial' | 'exact';
    usernames?: string;
    sortOrder?: 'asc' | 'desc';
    email?: string;
    status?: 'enabled' | 'disabled' | 'all';
    adminOnly?: 'true' | 'false';
    orderBy?: 'username';
    usernameOnly?: true | false;
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PrincipalPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/principals/${QS.query(
        QS.explode({
          limit,
          offset,
          match_criteria: matchCriteria,
          usernames,
          sort_order: sortOrder,
          email,
          status,
          admin_only: adminOnly,
          order_by: orderBy,
          username_only: usernameOnly,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Create a group in a tenant
 */
export function createGroup(group: Group, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 201;
          data: GroupOut;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      '/groups/',
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: group,
      })
    )
  );
}
/**
 * List the groups for a tenant
 */
export function listGroups(
  {
    limit,
    offset,
    name,
    nameMatch,
    scope,
    username,
    excludeUsername,
    uuid,
    roleNames,
    roleDiscriminator,
    orderBy,
    platformDefault,
    adminDefault,
    system,
  }: {
    limit?: number;
    offset?: number;
    name?: string;
    nameMatch?: 'partial' | 'exact';
    scope?: 'account' | 'principal';
    username?: string;
    excludeUsername?: string;
    uuid?: string[];
    roleNames?: string[];
    roleDiscriminator?: 'all' | 'any';
    orderBy?: 'name' | 'modified' | 'principalCount' | 'policyCount';
    platformDefault?: boolean;
    adminDefault?: boolean;
    system?: boolean;
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: GroupPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${QS.query(
        QS.explode({
          limit,
          offset,
          name,
          name_match: nameMatch,
          scope,
          username,
          exclude_username: excludeUsername,
          role_discriminator: roleDiscriminator,
          order_by: orderBy,
          platform_default: platformDefault,
          admin_default: adminDefault,
          system,
        }),
        QS.form({
          uuid,
          role_names: roleNames,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Get a group in the tenant
 */
export function getGroup(uuid: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: GroupWithPrincipalsAndRoles;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(`/groups/${encodeURIComponent(uuid)}/`, {
      ...opts,
    })
  );
}
/**
 * Update a group in the tenant
 */
export function updateGroup(
  uuid: string,
  group: Group,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: GroupOut;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/`,
      oazapfts.json({
        ...opts,
        method: 'PUT',
        body: group,
      })
    )
  );
}
/**
 * Delete a group in the tenant
 */
export function deleteGroup(uuid: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 204;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(`/groups/${encodeURIComponent(uuid)}/`, {
      ...opts,
      method: 'DELETE',
    })
  );
}
/**
 * Add a principal to a group in the tenant
 */
export function addPrincipalToGroup(
  uuid: string,
  groupPrincipalIn: GroupPrincipalIn,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: GroupWithPrincipalsAndRoles;
        }
      | {
          status: 400;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: ErrorNotFound;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/principals/`,
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: groupPrincipalIn,
      })
    )
  );
}
/**
 * Get a list of principals from a group in the tenant
 */
export function getPrincipalsFromGroup(
  uuid: string,
  {
    principalUsername,
    limit,
    offset,
    orderBy,
    usernameOnly,
  }: {
    principalUsername?: string;
    limit?: number;
    offset?: number;
    orderBy?: 'username';
    usernameOnly?: true | false;
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PrincipalPagination;
        }
      | {
          status: 400;
        }
      | {
          status: 401;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/principals/${QS.query(
        QS.explode({
          principal_username: principalUsername,
          limit,
          offset,
          order_by: orderBy,
          username_only: usernameOnly,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Remove a principal from a group in the tenant
 */
export function deletePrincipalFromGroup(
  uuid: string,
  usernames: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 204;
        }
      | {
          status: 400;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: ErrorNotFound;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/principals/${QS.query(
        QS.explode({
          usernames,
        })
      )}`,
      {
        ...opts,
        method: 'DELETE',
      }
    )
  );
}
/**
 * List the roles for a group in the tenant
 */
export function listRolesForGroup(
  uuid: string,
  {
    exclude,
    roleName,
    roleDisplayName,
    roleDescription,
    roleSystem,
    roleExternalTenant,
    limit,
    offset,
    orderBy,
  }: {
    exclude?: boolean;
    roleName?: string;
    roleDisplayName?: string;
    roleDescription?: string;
    roleSystem?: boolean;
    roleExternalTenant?: string;
    limit?: number;
    offset?: number;
    orderBy?: 'name' | 'display_name' | 'modified' | 'policyCount';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: GroupRolesPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/roles/${QS.query(
        QS.explode({
          exclude,
          role_name: roleName,
          role_display_name: roleDisplayName,
          role_description: roleDescription,
          role_system: roleSystem,
          role_external_tenant: roleExternalTenant,
          limit,
          offset,
          order_by: orderBy,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Add a role to a group in the tenant
 */
export function addRoleToGroup(
  uuid: string,
  groupRoleIn: GroupRoleIn,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: {
            data: RoleOut[];
          };
        }
      | {
          status: 400;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/roles/`,
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: groupRoleIn,
      })
    )
  );
}
/**
 * Remove a role from a group in the tenant
 */
export function deleteRoleFromGroup(
  uuid: string,
  roles: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 204;
        }
      | {
          status: 400;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/groups/${encodeURIComponent(uuid)}/roles/${QS.query(
        QS.explode({
          roles,
        })
      )}`,
      {
        ...opts,
        method: 'DELETE',
      }
    )
  );
}
/**
 * Create a role for a tenant
 */
export function createRole(roleIn: RoleIn, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 201;
          data: RoleWithAccess;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      '/roles/',
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: roleIn,
      })
    )
  );
}
/**
 * List the roles for a tenant
 */
export function listRoles(
  {
    limit,
    offset,
    name,
    system,
    displayName,
    nameMatch,
    scope,
    orderBy,
    addFields,
    username,
    application,
    permission,
    externalTenant,
  }: {
    limit?: number;
    offset?: number;
    name?: string;
    system?: boolean;
    displayName?: string;
    nameMatch?: 'partial' | 'exact';
    scope?: 'account' | 'principal';
    orderBy?: 'name' | 'display_name' | 'modified' | 'policyCount';
    addFields?: ('groups_in' | 'groups_in_count' | 'access')[];
    username?: string;
    application?: string;
    permission?: string;
    externalTenant?: string;
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: RolePaginationDynamic;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/roles/${QS.query(
        QS.explode({
          limit,
          offset,
          name,
          system,
          display_name: displayName,
          name_match: nameMatch,
          scope,
          order_by: orderBy,
          username,
          application,
          permission,
          external_tenant: externalTenant,
        }),
        QS.form({
          add_fields: addFields,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Get a role in the tenant
 */
export function getRole(
  uuid: string,
  {
    scope,
  }: {
    scope?: 'account' | 'principal';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: RoleWithAccess;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/roles/${encodeURIComponent(uuid)}/${QS.query(
        QS.explode({
          scope,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Delete a role in the tenant
 */
export function deleteRole(uuid: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 204;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(`/roles/${encodeURIComponent(uuid)}/`, {
      ...opts,
      method: 'DELETE',
    })
  );
}
/**
 * Update a role in the tenant
 */
export function updateRole(
  uuid: string,
  roleWithAccess: RoleWithAccess,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/roles/${encodeURIComponent(uuid)}/`,
      oazapfts.json({
        ...opts,
        method: 'PUT',
        body: roleWithAccess,
      })
    )
  );
}
/**
 * Patch a role in the tenant
 */
export function patchRole(
  uuid: string,
  rolePatch?: RolePatch,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: RoleWithAccess;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/roles/${encodeURIComponent(uuid)}/`,
      oazapfts.json({
        ...opts,
        method: 'PATCH',
        body: rolePatch,
      })
    )
  );
}
/**
 * Get access for a role in the tenant
 */
export function getRoleAccess(
  uuid: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: AccessPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/roles/${encodeURIComponent(uuid)}/access/${QS.query(
        QS.explode({
          limit,
          offset,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Create a policy in a tenant
 */
export function createPolicies(
  policyIn: PolicyIn,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 201;
          data: PolicyExtended;
        }
      | {
          status: 401;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      '/policies/',
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: policyIn,
      })
    )
  );
}
/**
 * List the policies in the tenant
 */
export function listPolicies(
  {
    limit,
    offset,
    name,
    scope,
    groupName,
    groupUuid,
    orderBy,
  }: {
    limit?: number;
    offset?: number;
    name?: string;
    scope?: 'account' | 'principal';
    groupName?: string;
    groupUuid?: string;
    orderBy?: 'name' | 'modified';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PolicyPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/policies/${QS.query(
        QS.explode({
          limit,
          offset,
          name,
          scope,
          group_name: groupName,
          group_uuid: groupUuid,
          order_by: orderBy,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Get a policy in the tenant
 */
export function getPolicy(uuid: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PolicyExtended;
        }
      | {
          status: 401;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(`/policies/${encodeURIComponent(uuid)}/`, {
      ...opts,
    })
  );
}
/**
 * Update a policy in the tenant
 */
export function updatePolicy(
  uuid: string,
  policyIn: PolicyIn,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PolicyExtended;
        }
      | {
          status: 401;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/policies/${encodeURIComponent(uuid)}/`,
      oazapfts.json({
        ...opts,
        method: 'PUT',
        body: policyIn,
      })
    )
  );
}
/**
 * Delete a policy in the tenant
 */
export function deletePolicy(uuid: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 204;
        }
      | {
          status: 401;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(`/policies/${encodeURIComponent(uuid)}/`, {
      ...opts,
      method: 'DELETE',
    })
  );
}
/**
 * Get the permitted access for a principal in the tenant (defaults to principal from the identity header)
 */
export function getPrincipalAccess(
  application: string,
  {
    username,
    orderBy,
    limit,
    offset,
  }: {
    username?: string;
    orderBy?: 'application' | 'resource_type' | 'verb';
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: AccessPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 404;
          data: Error;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/access/${QS.query(
        QS.explode({
          application,
          username,
          order_by: orderBy,
          limit,
          offset,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * List the permissions for a tenant
 */
export function listPermissions(
  {
    limit,
    offset,
    orderBy,
    application,
    resourceType,
    verb,
    permission,
    excludeGlobals,
    excludeRoles,
    allowedOnly,
  }: {
    limit?: number;
    offset?: number;
    orderBy?: 'application' | 'resource_type' | 'verb' | 'permission';
    application?: string;
    resourceType?: string;
    verb?: string;
    permission?: string;
    excludeGlobals?: 'true' | 'false';
    excludeRoles?: string;
    allowedOnly?: 'true' | 'false';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PermissionPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/permissions/${QS.query(
        QS.explode({
          limit,
          offset,
          order_by: orderBy,
          application,
          resource_type: resourceType,
          verb,
          permission,
          exclude_globals: excludeGlobals,
          exclude_roles: excludeRoles,
          allowed_only: allowedOnly,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * List the available options for fields of permissions for a tenant
 */
export function listPermissionOptions(
  field: 'application' | 'resource_type' | 'verb',
  {
    limit,
    offset,
    application,
    resourceType,
    verb,
    excludeGlobals,
    allowedOnly,
  }: {
    limit?: number;
    offset?: number;
    application?: string;
    resourceType?: string;
    verb?: string;
    excludeGlobals?: 'true' | 'false';
    allowedOnly?: 'true' | 'false';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: PermissionOptionsPagination;
        }
      | {
          status: 401;
        }
      | {
          status: 403;
          data: Error403;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/permissions/options/${QS.query(
        QS.explode({
          limit,
          offset,
          field,
          application,
          resource_type: resourceType,
          verb,
          exclude_globals: excludeGlobals,
          allowed_only: allowedOnly,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
