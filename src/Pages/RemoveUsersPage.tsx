import { Button, ButtonVariant, Modal } from '@patternfly/react-core';
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from '@rhoas/app-services-ui-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { License, User } from '../client/service';
import { useCallback, useState } from 'react';
import { useService } from '../Components/ServiceProvider';
import { UsersPickerTable } from '../Components/UsersPickerTable';
import { useHistory } from 'react-router-dom';
import { PageParams } from './AddUsersPage';

export const RemoveUsersPage = ({ user, onSuccess, onError }: PageParams) => {
  const history = useHistory();
  const service = useService();

  const subscriptions = useQuery<License>({
    queryKey: ['subscriptions'],
    queryFn: () => service.get(user),
  });

  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const usernameChips = useURLSearchParamsChips(
    'username',
    resetPaginationQuery
  );

  const queryClient = useQueryClient();
  const users = useQuery<User[]>({
    queryKey: [
      'assignedUsers',
      { page, perPage, usernames: usernameChips.chips },
    ],
    queryFn: () => service.seats(user),
  });

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const assignedSeats =
    (subscriptions.data?.total || 0) - (subscriptions.data?.available || 0);

  const { mutate, isLoading } = useMutation(
    () => {
      setCheckedUsers([]);
      return service.unAssign(user, checkedUsers);
    },
    {
      onSuccess: () => {
        onSuccess('Successfully removed users');
        queryClient.invalidateQueries({ queryKey: ['users', 'assignedUsers'] });
      },
      onError: (error) => {
        onError('there was an error: ' + error);
      },
    }
  );

  const close = () => history.push('/');

  return (
    <Modal
      isOpen
      title={`Remove ${assignedSeats} users from their assigned seats`}
      variant="medium"
      onClose={close}
      actions={[
        <Button
          key="remove"
          onClick={() => mutate()}
          isDisabled={checkedUsers.length > assignedSeats}
          isLoading={isLoading}
        >
          Remove
        </Button>,
        <Button
          key="cancel"
          onClick={close}
          variant={ButtonVariant.link}
          isDisabled={isLoading}
        >
          Cancel
        </Button>,
      ]}
    >
      <UsersPickerTable
        users={users.data}
        itemCount={users.data?.length}
        page={page}
        perPage={perPage}
        onPageChange={setPagination}
        usernames={usernameChips.chips}
        onSearchUsername={usernameChips.add}
        onRemoveUsernameChip={usernameChips.remove}
        onRemoveUsernameChips={usernameChips.clear}
        onClearAllFilters={usernameChips.clear}
        isUserChecked={(user) => checkedUsers.includes(user.id)}
        onCheckUser={(user, isChecked) => {
          setCheckedUsers(
            isChecked
              ? [...checkedUsers, user.id]
              : checkedUsers.filter((u) => u !== user.id)
          );
        }}
      />
    </Modal>
  );
};
