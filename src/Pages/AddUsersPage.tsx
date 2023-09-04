import { Alert, Button, ButtonVariant, Modal } from '@patternfly/react-core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthenticatedUser, License, UserResult } from '../client/service';
import { useState } from 'react';
import { useAppNavigate } from '../Components/AppLink';
import { useService } from '../Components/ServiceProvider';
import { UsersWithSeatTable } from '../Components/UsersWithSeatTable';
import { usePagination } from './usePagination';

export type PageParams = {
  user: AuthenticatedUser;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

export const AddUsersPage = ({ user, onSuccess, onError }: PageParams) => {
  const navigate = useAppNavigate();
  const service = useService();

  const close = () => navigate('/');

  const [page, perPage, setPagination] = usePagination();

  const subscriptions = useQuery<License>({
    queryKey: ['subscriptions', { page, perPage }],
    queryFn: () => service.get(user, { page, perPage }),
  });

  const queryClient = useQueryClient();
  const users = useQuery<UserResult>({
    queryKey: ['availableUsers', { page, perPage, usernames: [] }],
    queryFn: () => service.seats(user, { page, perPage }, false),
  });

  const { mutate, isLoading } = useMutation(
    () => service.assign(user, checkedUsers),
    {
      onSuccess: () => {
        close();
        onSuccess('Successfully assigned users');
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        onError('there was an error: ' + error);
      },
    }
  );

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const assignedSeats =
    (subscriptions.data?.total || 0) - (subscriptions.data?.available || 0);
  const isAddDisabled =
    subscriptions.data?.total === undefined
      ? true
      : checkedUsers.length > 0
      ? checkedUsers.length + assignedSeats > subscriptions.data.total
      : true;

  return (
    <Modal
      isOpen
      title="Assign users"
      variant="medium"
      onClose={close}
      actions={[
        <Button
          key="assign"
          onClick={() => mutate()}
          isDisabled={isAddDisabled}
          isLoading={isLoading}
        >
          Assign
        </Button>,
        <Button key="cancel" onClick={close} variant={ButtonVariant.link}>
          Cancel
        </Button>,
      ]}
    >
      {checkedUsers.length + assignedSeats >
        (subscriptions.data?.total || 0) && (
        <Alert
          variant="warning"
          isInline
          title={`Your organization has ${subscriptions.data?.total} Ansible Lightspeed with IBM watsonx Code Assistant seats only available for assignment. Please remove a few seat assignments in order to continue.`}
        />
      )}
      <UsersWithSeatTable
        isPicker
        totalSeats={subscriptions.data?.total}
        users={users.data?.users}
        itemCount={users.data?.count}
        page={page}
        perPage={perPage}
        onPageChange={setPagination}
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
