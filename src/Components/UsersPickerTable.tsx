import type { TableViewProps } from '@rhoas/app-services-ui-components';
import { TableView } from '@rhoas/app-services-ui-components';
import { User } from '../client/service';
import {
  EmptyStateNoResults,
  EmptyStateNoResultsProps,
} from './EmptyStateNoResults';

export const Columns = ['name'] as const;

export const labels: { [key in (typeof Columns)[number]]: string } = {
  name: 'Display name',
};

export type UsersPickerTableProps = {
  users: Array<User> | undefined | null;
  isUserChecked: (row: User) => boolean;
  usernames: string[];
  onSearchUsername: (value: string) => void;
  onRemoveUsernameChip: (value: string) => void;
  onRemoveUsernameChips: () => void;
  onCheckUser: (row: User, isChecked: boolean) => void;
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

export const UsersPickerTable = ({
  users,
  itemCount,
  page,
  perPage,
  usernames,
  isColumnSortable,
  isUserChecked,
  onPageChange,
  onSearchUsername,
  onRemoveUsernameChip,
  onRemoveUsernameChips,
  onClearAllFilters,
  onCheckUser,
}: UsersPickerTableProps) => {
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
            {row[column]}
          </Td>
        );
      }}
      isColumnSortable={isColumnSortable}
      isRowChecked={({ row }) => isUserChecked(row)}
      onCheck={({ row }, isChecked) => onCheckUser(row, isChecked)}
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
      itemCount={itemCount}
      page={page}
      perPage={perPage}
      onPageChange={onPageChange}
      onClearAllFilters={onClearAllFilters}
      ariaLabel={'Seats Administration users'}
      isFiltered={isFiltered}
      emptyStateNoData={<>{/* this can't happen */}</>}
      emptyStateNoResults={
        <EmptyStateNoResults onClearAllFilters={onClearAllFilters} />
      }
    />
  );
};
