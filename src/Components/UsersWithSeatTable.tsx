import { Button } from '@patternfly/react-core';
import { ActionsColumn } from '@patternfly/react-table';
import type { TableViewProps } from '@rhoas/app-services-ui-components';
import { TableView } from '@rhoas/app-services-ui-components';
import { User } from '../client/service';
import { Link } from 'react-router-dom';
import { EmptyStateNoAssignedSeat } from './EmptyStateNoAssignedSeat';
import {
  EmptyStateNoResults,
  EmptyStateNoResultsProps,
} from './EmptyStateNoResults';

export const Columns = ['name'] as const;

export const labels: { [key in (typeof Columns)[number]]: string } = {
  name: 'Username',
};

export type UsersWithSeatTableProps = {
  users: Array<User> | undefined | null;
  getUrlForUser: (row: User) => string;
  totalSeats: number | undefined;
  usernames: string[];
  canAddUser: boolean;
  onAddUser: () => void;
  isUserChecked: (user: User) => boolean;
  onCheckUser: (user: User, isChecked: boolean) => void;
  onSearchUsername: (value: string) => void;
  onRemoveUsernameChip: (value: string) => void;
  onRemoveUsernameChips: () => void;
  onRemoveSeat: (row?: User) => void;
} & Pick<
  TableViewProps<User, (typeof Columns)[number]>,
  | 'itemCount'
  | 'page'
  | 'perPage'
  | 'onPageChange'
  | 'isColumnSortable'
  | 'onClearAllFilters'
> &
  EmptyStateNoResultsProps;

export const UsersWithSeatTable = ({
  users,
  itemCount,
  page,
  perPage,
  usernames,
  totalSeats,
  getUrlForUser,
  isColumnSortable,
  canAddUser,
  isUserChecked,
  onCheckUser,
  onPageChange,
  onRemoveSeat,
  onAddUser,
  onSearchUsername,
  onRemoveUsernameChip,
  onRemoveUsernameChips,
  onClearAllFilters,
}: UsersWithSeatTableProps) => {
  const breakpoint = 'lg';

  const isFiltered = usernames.length > 0;

  return (
    <TableView
      data={users}
      columns={Columns}
      renderHeader={({ column, Th, key }) => (
        <Th key={key}>{labels[column]}</Th>
      )}
      renderCell={({ column, row, Td, key }) => {
        return (
          <Td key={key} dataLabel={labels[column]}>
            {(() => {
              switch (column) {
                case 'name':
                  return (
                    <Button
                      variant="link"
                      component={(props) => (
                        <Link to={getUrlForUser(row)} {...props}>
                          {row.name}
                        </Link>
                      )}
                      isInline
                    />
                  );

                default:
                  return row[column];
              }
            })()}
          </Td>
        );
      }}
      renderActions={({ row }) => {
        return (
          <ActionsColumn
            rowData={hackZIndex}
            items={[
              {
                title: 'Remove seat',
                onClick: () => onRemoveSeat(row),
              },
            ]}
          />
        );
      }}
      isColumnSortable={isColumnSortable}
      toolbarBreakpoint={breakpoint}
      filters={{
        ['Username']: {
          type: 'search',
          chips: usernames,
          onSearch: onSearchUsername,
          onRemoveChip: onRemoveUsernameChip,
          onRemoveGroup: onRemoveUsernameChips,
          validate: (value) => /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(value),
          errorMessage: 'Invalid string',
        },
      }}
      actions={[
        ...(canAddUser
          ? [
              {
                label: 'Assign user(s)',
                onClick: onAddUser,
                isPrimary: true,
              },
            ]
          : []),
        {
          label: 'Remove user(s)',
          onClick: () => onRemoveSeat(),
          isPrimary: false,
        },
      ]}
      itemCount={itemCount}
      page={page}
      perPage={perPage}
      onPageChange={onPageChange}
      onClearAllFilters={onClearAllFilters}
      ariaLabel={'Seats Administration users'}
      isFiltered={isFiltered}
      isRowChecked={({ row }) => isUserChecked(row)}
      onCheck={({ row }, isChecked) => onCheckUser(row, isChecked)}
      emptyStateNoData={
        <EmptyStateNoAssignedSeat
          totalSeats={totalSeats || 0}
          onAddUsers={onAddUser}
        />
      }
      emptyStateNoResults={
        <EmptyStateNoResults onClearAllFilters={onClearAllFilters} />
      }
    />
  );
};

const hackZIndex = {
  actionProps: {
    style: { zIndex: 9999 },
  },
};
