import {
  Button,
  Modal,
  Pagination,
  PaginationVariant,
} from '@patternfly/react-core';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import { User } from '../client/service';
import { useState } from 'react';

type ConfirmRemoveDialogProps = {
  users: User[];
  onConfirm: () => void;
  onCancel: () => void;
};

const PAGE_SIZE = 5;

export const ConfirmRemoveDialog = ({
  users,
  onConfirm,
  onCancel,
}: ConfirmRemoveDialogProps) => {
  const [usersPage, setUserPage] = useState<User[]>(users.slice(0, PAGE_SIZE));
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [page, setPage] = useState(1);

  return (
    <Modal
      title="Remove users"
      titleIconVariant="warning"
      isOpen
      variant="small"
      actions={[
        <Button key="remove" variant="danger" onClick={() => onConfirm()}>
          Remove user(s)
        </Button>,
        <Button key="cancel" variant="link" onClick={() => onCancel()}>
          Cancel
        </Button>,
      ]}
      onClose={onCancel}
    >
      Are you sure you want to remove the user(s) below from Project Wisdom
      {users.length > 5 ? (
        <>
          <TableComposable variant="compact">
            <Thead>
              <Tr>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersPage.map((user) => (
                <Tr key={user.id}>
                  <Td dataLabel="Name">{user.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
          <Pagination
            isCompact
            perPageComponent="button"
            itemCount={users.length}
            perPage={pageSize}
            page={page}
            variant={PaginationVariant.bottom}
            perPageOptions={[
              { title: '5', value: 5 },
              { title: '10', value: 10 },
              { title: '20', value: 20 },
            ]}
            onPerPageSelect={(_, pageSize) => {
              setPageSize(pageSize);
              setUserPage(users.slice((page - 1) * pageSize, page * pageSize));
            }}
            onSetPage={(_, page) => {
              setPage(page);
              setUserPage(users.slice((page - 1) * pageSize, page * pageSize));
            }}
          />
        </>
      ) : (
        <p className="pf-u-pt-md">
          {users.map((user, i) => (
            <>
              <b>{user.name}</b>
              {i !== users.length - 1 ? ', ' : ''}
            </>
          ))}
        </p>
      )}
    </Modal>
  );
};
