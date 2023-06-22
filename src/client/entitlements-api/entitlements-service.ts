/**
 * Entitlements
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from 'oazapfts/lib/runtime';
import * as QS from 'oazapfts/lib/runtime/query';
export const defaults: Oazapfts.RequestOpts = {
  baseUrl: '/api/entitlements/v1/',
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
  localEntitlementsApi: '/api/entitlements/v1/',
  prodEntitlementsApi: 'https://cloud.redhat.com/api/entitlements/v1/',
};
export type ServiceDetails = {
  is_entitled?: boolean;
  is_trial?: boolean;
};
export type Service = {
  [key: string]: ServiceDetails;
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
export type Seat = {
  subscription_id?: string;
  account_username?: string;
};
export type ListSeatsResponsePagination = ListPagination & {
  data: Seat[];
  allowed?: number;
  consumed?: number;
};
export type Error = {
  error?: string;
};
export type SeatRequest = {
  account_username: string;
};
export type ComplianceScreeningResponse = {
  result?: 'OK' | 'ERROR_T5' | 'ERROR_OFAC' | 'ERROR_EXPORT_CONTROL';
  description?: string;
};
export type ComplianceScreeningErrorResponse = {
  errors?: {
    error?: string;
    identityType?: string;
    identity?: string;
  }[];
};
export type DependencyErrorDetails = {
  dependency_failure?: boolean;
  service?: string;
  status?: number;
  endpoint?: string;
  message?: string;
};
export type DependencyErrorResponse = {
  error?: {
    [key: string]: DependencyErrorDetails;
  };
};
/**
 * get a list of services a user is entitled to
 */
export function getServices(opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: Service;
        }
      | {
          status: 404;
        }
    >('/services', {
      ...opts,
    })
  );
}
/**
 * returns list of users occupying seats
 */
export function getSeats(
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
          data: ListSeatsResponsePagination;
        }
      | {
          status: 500;
          data: Error;
        }
    >(
      `/seats${QS.query(
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
 * assign a user to a seat
 */
export function postSeats(
  seatRequest: SeatRequest,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: Seat;
        }
      | {
          status: 400;
          data: Error;
        }
    >(
      '/seats',
      oazapfts.json({
        ...opts,
        method: 'POST',
        body: seatRequest,
      })
    )
  );
}
/**
 * remove a user from a seat
 */
export function deleteSeatsById(id: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 204;
        }
      | {
          status: 400;
          data: Error;
        }
      | {
          status: 403;
          data: Error;
        }
    >(`/seats/${encodeURIComponent(id)}`, {
      ...opts,
      method: 'DELETE',
    })
  );
}
/**
 * verify exports compliance for a given user
 */
export function getCompliance(opts?: Oazapfts.RequestOpts) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200;
          data: ComplianceScreeningResponse;
        }
      | {
          status: 400;
          data: ComplianceScreeningErrorResponse;
        }
      | {
          status: 500;
          data: DependencyErrorResponse;
        }
    >('/compliance', {
      ...opts,
    })
  );
}
