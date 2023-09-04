import {
  Alert,
  AlertActionCloseButton,
  Page,
  PageSection,
} from '@patternfly/react-core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppNavigate } from '../Components/AppLink';
import { EmptyStateNoSubscription } from '../Components/EmptyStateNoSubscription';
import { RemoveUsersModal } from '../Components/RemoveUsersModal';
import { SeatsHeader } from '../Components/SeatsHeader';
import { useService } from '../Components/ServiceProvider';
import { UsersWithSeatTable } from '../Components/UsersWithSeatTable';
import { License, User, UserResult } from '../client/service';
import { ConfirmRemoveDialog } from '../Components/ConfirmRemoveDialog';
import { PageParams } from './AddUsersPage';
import { usePagination } from './usePagination';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const UsersPage = ({
  user,
  onSuccess,
  onError,
}: Optional<PageParams, 'onSuccess' | 'onError'>) => {
  const navigate = useAppNavigate();
  const [checkedUsers, setCheckedUsers] = useState<User[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);

  const [page, perPage, setPagination] = usePagination();

  const service = useService();
  const queryClient = useQueryClient();

  const subscriptions = useQuery<License>({
    queryKey: ['subscriptions', { page, perPage }],
    queryFn: () => service.get(user, { page, perPage }),
  });

  const users = useQuery<UserResult>({
    queryKey: ['users', { page, perPage }],
    queryFn: () => service.seats(user, { page, perPage }),
  });

  const negativeSeats = (subscriptions.data?.available || 0) < 0;
  const usersToRemove = Math.abs(subscriptions.data?.available || 0);

  const cantAddUsers =
    (subscriptions.data?.total || 0) > 0 && subscriptions.data?.available === 0;

  const { mutate } = useMutation(
    async (arg: User[]) => {
      await service.unAssign(
        user,
        arg.map(({ id }) => id)
      );
      setConfirmOpen(false);
      setCheckedUsers([]);
    },
    {
      onSuccess: () => {
        onSuccess && onSuccess('Successfully removed users');
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        onError && onError('there was an error: ' + error);
      },
    }
  );
  return (
    <Page>
      <SeatsHeader
        totalSeats={subscriptions.data?.total || 0}
        availableSeats={subscriptions.data?.available || 0}
      />
      {subscriptions.data?.total === 0 && <EmptyStateNoSubscription />}
      {negativeSeats && usersToRemove && (
        <RemoveUsersModal
          usersToRemove={usersToRemove}
          onOk={() => navigate('/remove-users')}
        />
      )}
      {confirmOpen && (
        <ConfirmRemoveDialog
          users={checkedUsers}
          onConfirm={() => mutate(checkedUsers)}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
      {cantAddUsers && alertOpen ? (
        <PageSection style={{ paddingBottom: 0 }}>
          <Alert
            title={
              "There are 0 seats left in your organization's subscription. Contact Red Hat to manage your Ansible Lightspeed with IBM watsonx Code Assistant license."
            }
            variant="warning"
            actionClose={
              <AlertActionCloseButton onClose={() => setAlertOpen(false)} />
            }
          />
        </PageSection>
      ) : null}
      <PageSection>
        {subscriptions.data?.total !== 0 && (
          <UsersWithSeatTable
            totalSeats={subscriptions.data?.total}
            users={users.data?.users}
            itemCount={users.data?.count}
            canAddUser={!cantAddUsers && user.isOrgAdmin}
            canRemove={user.isOrgAdmin}
            page={page}
            perPage={perPage}
            onPageChange={setPagination}
            onAddUser={() => {
              navigate('/add-users');
            }}
            isUserChecked={(user) => checkedUsers.includes(user)}
            onCheckUser={(user, isChecked) => {
              setCheckedUsers(
                isChecked
                  ? [...checkedUsers, user]
                  : checkedUsers.filter((u) => u !== user)
              );
            }}
            setSelectedUser={(users) => setCheckedUsers(users)}
            onRemoveSeat={(user) => {
              if (user) setCheckedUsers([user]);
              setConfirmOpen(true);
            }}
          />
        )}
      </PageSection>
      <Outlet />
    </Page>
  );
};
