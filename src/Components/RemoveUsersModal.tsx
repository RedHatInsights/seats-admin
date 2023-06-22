import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
} from '@patternfly/react-core';
import { VoidFunctionComponent } from 'react';

export type RemoveUsersModalProps = {
  usersToRemove: number;
  onOk: () => void;
};

const RemoveUsersModal: VoidFunctionComponent<RemoveUsersModalProps> = ({
  usersToRemove,
  onOk,
}) => {
  return (
    <Modal
      id="remove-users-modal"
      variant={ModalVariant.small}
      isOpen={true}
      aria-label={'Remove users from seats'}
      title={'Remove users from seats'}
      titleIconVariant="warning"
      showClose={false}
      aria-describedby="modal-message"
      actions={[
        <Button onClick={onOk} key={1} variant={ButtonVariant.primary}>
          Ok
        </Button>,
      ]}
    >
      Your organization has decreased the amount of seats available. Please
      remove {usersToRemove} users from their seats to continue the
      subscription.
    </Modal>
  );
};

export { RemoveUsersModal };
