/**
 * CIAM Authz
 * version not set
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from 'oazapfts/lib/runtime';
import * as QS from 'oazapfts/lib/runtime/query';
export const defaults: Oazapfts.RequestOpts = {
  baseUrl:
    'https://ciam-authz-hw-ciam-authz--runtime-ext.apps.ext.spoke.preprod.us-east-1.aws.paas.redhat.com/',
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
  server1:
    'https://ciam-authz-hw-ciam-authz--runtime-ext.apps.ext.spoke.preprod.us-east-1.aws.paas.redhat.com/',
};
export type V1AlphaCheckPermissionRequest = {
  subject?: string;
  operation?: string;
  resourcetype?: string;
  resourceid?: string;
};
export type V1AlphaCheckPermissionResponse = {
  result?: boolean;
  description?: string;
};
export type ProtobufAny = {
  [key: string]: object;
};
export type RpcStatus = {
  code?: number;
  message?: string;
  details?: ProtobufAny[];
};
export type V1AlphaGetLicenseResponse = {
  seatsTotal?: number;
  seatsAvailable?: number;
};
export type LicensesServiceIdBody = {
  assign?: string[];
  unassign?: string[];
};
export type V1AlphaModifySeatsResponse = object;
export type V1AlphaGetSeatsUserRepresentation = {
  displayName?: string;
  id?: string;
  assigned?: boolean;
};
export type V1AlphaGetSeatsResponse = {
  users?: V1AlphaGetSeatsUserRepresentation[];
};
/**
 * Checks the permission and returns allowed (true) or not allowed (false)
 */
export function checkPermissionCheckPermission(
  v1AlphaCheckPermissionRequest: V1AlphaCheckPermissionRequest,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: V1AlphaCheckPermissionResponse;
        }
      | {
          status: 401;
          data: object;
        }
      | {
          status: 403;
          data: object;
        }
      | {
          status: 500;
          data: object;
        }
      | {
          status: number;
          data: RpcStatus;
        }
    >(
      '/v1alpha/check',
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: v1AlphaCheckPermissionRequest,
      })
    )
  );
}
/**
 * Summarize a license.
 */
export function licenseServiceGetLicense(
  orgId: string,
  serviceId: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: V1AlphaGetLicenseResponse;
        }
      | {
          status: 401;
          data: object;
        }
      | {
          status: 403;
          data: object;
        }
      | {
          status: 500;
          data: object;
        }
      | {
          status: number;
          data: RpcStatus;
        }
    >(
      `/v1alpha/orgs/${encodeURIComponent(orgId)}/licenses/${encodeURIComponent(
        serviceId
      )}`,
      {
        ...opts,
      }
    )
  );
}
/**
 * Assign or unassign users to/from the license.
 */
export function licenseServiceModifySeats(
  orgId: string,
  serviceId: string,
  licensesServiceIdBody: LicensesServiceIdBody,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: V1AlphaModifySeatsResponse;
        }
      | {
          status: 401;
          data: object;
        }
      | {
          status: 403;
          data: object;
        }
      | {
          status: 500;
          data: object;
        }
      | {
          status: number;
          data: RpcStatus;
        }
    >(
      `/v1alpha/orgs/${encodeURIComponent(orgId)}/licenses/${encodeURIComponent(
        serviceId
      )}`,
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: licensesServiceIdBody,
      })
    )
  );
}
/**
 * Gets user details with filters.
 */
export function licenseServiceGetSeats(
  orgId: string,
  serviceId: string,
  {
    includeUsers,
    filter,
  }: {
    includeUsers?: boolean;
    filter?: 'assigned' | 'assignable';
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: V1AlphaGetSeatsResponse;
        }
      | {
          status: 401;
          data: object;
        }
      | {
          status: 403;
          data: object;
        }
      | {
          status: 500;
          data: object;
        }
      | {
          status: number;
          data: RpcStatus;
        }
    >(
      `/v1alpha/orgs/${encodeURIComponent(orgId)}/licenses/${encodeURIComponent(
        serviceId
      )}/seats${QS.query(
        QS.explode({
          includeUsers,
          filter,
        })
      )}`,
      {
        ...opts,
      }
    )
  );
}
