import {
  Bullseye,
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuToggle,
  MenuToggleCheckbox,
  Pagination,
  Popper,
  SearchInput,
  Skeleton,
  Spinner,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import {
  ActionsColumn,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import filter from 'lodash.filter';
import orderBy from 'lodash.orderby';
import { VoidFunctionComponent, useMemo, useState } from 'react';
import { User } from '../client/service';
import { EmptyStateNoAssignedSeat } from './EmptyStateNoAssignedSeat';
import { EmptyStateNoResults } from './EmptyStateNoResults';

export const Columns = ['userName', 'firstName', 'lastName'] as const;
type ColumnTypes = (typeof Columns)[number];

export const labels: { [key in ColumnTypes]: string } = {
  userName: 'Username',
  firstName: 'First name',
  lastName: 'Last name',
};

export type UsersWithSeatTableProps = {
  users: Array<User> | undefined | null;
  totalSeats: number | undefined;
  canAddUser?: boolean;
  canRemove?: boolean;
  onAddUser?: () => void;
  isUserChecked: (user: User) => boolean;
  onCheckUser: (user: User, isChecked: boolean) => void;
  setSelectedUser?: (users: User[]) => void;
  onRemoveSeat?: (row?: User) => void;
  isPicker?: boolean;
  itemCount?: number;
  page: number;
  perPage: number;
  onPageChange: (page: number, perPage: number) => void;
};

const TableSkeleton: VoidFunctionComponent<{
  columns: number;
  rows: number;
}> = ({ columns, rows }) => {
  const skeletonCells = new Array(columns).fill(0).map((_, index) => {
    return (
      <Td key={`cell_${index}`}>
        <Skeleton
          screenreaderText={index === 0 ? 'Loading content' : undefined}
        />
      </Td>
    );
  });
  const skeletonRows = new Array(rows)
    .fill(0)
    .map((_, index) => <Tr key={`row_${index}`}>{skeletonCells}</Tr>);
  return <>{skeletonRows}</>;
};

type SelectOption = 'all' | 'none' | 'page';

type BulkSelectToolbarProps = {
  perPage: number;
  itemCount: number;
  select: (option: SelectOption) => void;
};

const BulkSelectToolbar = ({
  perPage,
  itemCount,
  select,
}: BulkSelectToolbarProps) => {
  const [isBulkSelectOpen, setIsBulkSelectOpen] = useState(false);
  const [menuToggleCheckmark, setMenuToggleCheckmark] = useState(false);

  return (
    <Popper
      trigger={
        <MenuToggle
          onClick={() => setIsBulkSelectOpen(!isBulkSelectOpen)}
          isExpanded={isBulkSelectOpen}
          splitButtonOptions={{
            items: [
              <MenuToggleCheckbox
                id="select-all"
                key="select-all"
                aria-label="Select all"
                isChecked={menuToggleCheckmark}
                onChange={(checked) => {
                  setMenuToggleCheckmark(checked);
                  select(checked ? 'all' : 'none');
                }}
              />,
            ],
          }}
          aria-label="Full table selection checkbox"
        />
      }
      popper={
        <Menu
          id="select"
          onSelect={(_ev, itemId) => {
            setMenuToggleCheckmark(itemId === 1 || itemId === 2);
            select(itemId === 1 ? 'page' : itemId === 2 ? 'all' : 'none');
            setIsBulkSelectOpen(!isBulkSelectOpen);
          }}
        >
          <MenuContent>
            <MenuList>
              <MenuItem itemId={0}>Select none (0 items)</MenuItem>
              <MenuItem itemId={1}>
                Select page ({perPage > itemCount ? itemCount : perPage} items)
              </MenuItem>
              <MenuItem itemId={2}>Select all ({itemCount} items)</MenuItem>
            </MenuList>
          </MenuContent>
        </Menu>
      }
      isVisible={isBulkSelectOpen}
      popperMatchesTriggerWidth={false}
    />
  );
};

export const UsersWithSeatTable = ({
  users,
  itemCount,
  page,
  perPage,
  totalSeats,
  canAddUser = false,
  canRemove = true,
  isUserChecked,
  onCheckUser,
  setSelectedUser,
  onPageChange,
  onRemoveSeat,
  onAddUser,
  isPicker = false,
}: UsersWithSeatTableProps) => {
  const [activeSortIndex, setActiveSortIndex] = useState<number | undefined>();
  const [activeSortDirection, setActiveSortDirection] = useState<
    'asc' | 'desc' | undefined
  >();

  const [filterColumn, setFilterColumn] = useState<ColumnTypes>(Columns[0]);
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const startIndex = (page - 1) * (perPage || 20);

  const data = useMemo<User[]>(() => {
    let page = users?.slice(startIndex, startIndex + (perPage || 20)) || [];
    if (activeSortIndex !== undefined) {
      page = orderBy(page, Columns[activeSortIndex], activeSortDirection);
    }

    if (filterValue !== '') {
      page = filter(page, (user: User) =>
        user[filterColumn].includes(filterValue)
      );
    }
    return page;
  }, [
    users,
    startIndex,
    perPage,
    activeSortIndex,
    activeSortDirection,
    filterValue,
    filterColumn,
  ]);

  if (users === null) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }
  if (users?.length === 0 && filterValue === '' && !isPicker) {
    return (
      <EmptyStateNoAssignedSeat
        totalSeats={totalSeats || 0}
        onAddUsers={() => onAddUser?.()}
      />
    );
  }

  return (
    <>
      <Toolbar clearAllFilters={() => setFilterValue('')}>
        <ToolbarContent>
          {!isPicker && (
            <ToolbarItem>
              <BulkSelectToolbar
                perPage={perPage || 20}
                itemCount={itemCount || 0}
                select={(option) => {
                  switch (option) {
                    case 'all':
                      setSelectedUser?.(users || []);
                      break;
                    case 'page':
                      setSelectedUser?.(data || []);
                      break;
                    default:
                      setSelectedUser?.([]);
                  }
                }}
              />
            </ToolbarItem>
          )}
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            <ToolbarGroup variant="filter-group">
              <ToolbarItem>
                <Popper
                  isVisible={filterOpen}
                  trigger={
                    <MenuToggle
                      onClick={() => setFilterOpen(!filterOpen)}
                      isExpanded={filterOpen}
                      icon={<FilterIcon />}
                    >
                      {labels[filterColumn]}
                    </MenuToggle>
                  }
                  popper={
                    <Menu
                      onSelect={(_ev, itemId) => {
                        setFilterColumn(itemId?.toString() as ColumnTypes);
                        setFilterOpen(false);
                      }}
                    >
                      <MenuContent>
                        <MenuList>
                          {Columns.map((column) => (
                            <MenuItem key={column} itemId={column}>
                              {labels[column]}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </MenuContent>
                    </Menu>
                  }
                />
              </ToolbarItem>
              <ToolbarFilter
                chips={filterValue !== '' ? [filterValue] : ([] as string[])}
                deleteChip={() => setFilterValue('')}
                deleteChipGroup={() => setFilterValue('')}
                categoryName={labels[filterColumn]}
                widths={isPicker ? { default: '500px' } : undefined}
              >
                <SearchInput
                  aria-label="Filter table based on column"
                  placeholder={`Filter by ${labels[filterColumn]}`}
                  onChange={(_event, value) => setSearch(value)}
                  onSearch={(_, value) => setFilterValue(value)}
                  value={search}
                  onClear={() => {
                    setSearch('');
                  }}
                />
              </ToolbarFilter>
            </ToolbarGroup>
          </ToolbarToggleGroup>
          {!isPicker && canAddUser && (
            <ToolbarItem>
              <Button onClick={onAddUser}>Assign users</Button>
            </ToolbarItem>
          )}
          {!isPicker && canRemove && (
            <>
              <ToolbarItem>
                <Button onClick={() => onRemoveSeat?.()} variant="secondary">
                  Remove users
                </Button>
              </ToolbarItem>
              <ToolbarItem alignment={{ default: 'alignRight' }}>
                <Pagination
                  itemCount={itemCount || 0}
                  page={page}
                  perPage={perPage || 20}
                  onSetPage={(_, page) => onPageChange(page, perPage)}
                  onPerPageSelect={(_, perPage) => onPageChange(1, perPage)}
                  isCompact
                  variant="top"
                />
              </ToolbarItem>
            </>
          )}
        </ToolbarContent>
      </Toolbar>
      <TableComposable aria-label="Ansible Lightspeed with IBM watsonx Code Assistant users">
        <Thead>
          <Tr>
            <Th />
            {Columns.map((column, index) => (
              <Th
                key={column}
                sort={{
                  sortBy: {
                    index: activeSortIndex,
                    direction: activeSortDirection,
                    defaultDirection: 'asc',
                  },
                  onSort: (_event, index, direction) => {
                    setActiveSortIndex(index);
                    setActiveSortDirection(direction);
                  },
                  columnIndex: index,
                }}
              >
                {labels[column]}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {users === undefined && (
            <TableSkeleton columns={Columns.length + 1} rows={3} />
          )}
          {data?.map((row, rowIndex) => (
            <Tr key={row.id}>
              <Td
                select={{
                  rowIndex,
                  onSelect: (_event, isChecked) => onCheckUser(row, isChecked),
                  isSelected: isUserChecked(row),
                }}
              />
              {Columns.map((column) => (
                <Td key={`${row.id}-${column}`} dataLabel={labels[column]}>
                  {row[column]}
                </Td>
              ))}
              {!isPicker && (
                <Td isActionCell>
                  <ActionsColumn
                    items={[
                      {
                        title: 'Remove user',
                        onClick: () => onRemoveSeat?.(row),
                      },
                    ]}
                  />
                </Td>
              )}
            </Tr>
          ))}
          {data?.length === 0 && filterValue !== '' && (
            <Tr>
              <Td colSpan={Columns.length}>
                <EmptyStateNoResults
                  onClearAllFilters={() => setFilterValue('')}
                />
              </Td>
            </Tr>
          )}
        </Tbody>
      </TableComposable>
      <Toolbar>
        <Pagination
          itemCount={itemCount || 0}
          page={page}
          perPage={perPage || 20}
          onSetPage={(_, page) => onPageChange(page, perPage)}
          onPerPageSelect={(_, perPage) => onPageChange(1, perPage)}
          isCompact
          variant="bottom"
        />
      </Toolbar>
    </>
  );
};
