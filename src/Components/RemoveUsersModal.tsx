import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
  Title,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
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
      isOpen
      aria-label="Remove users from Ansible Lightspeed with IBM watsonx Code Assistant"
      header={
        <Title headingLevel="h1" style={{ display: 'flex' }}>
          <ExclamationTriangleIcon
            size="lg"
            style={{ color: 'var(--pf-global--warning-color--100)' }}
          />
          <span className="pf-u-ml-md">
            Remove users from Ansible Lightspeed with IBM watsonx Code
            Assistant.
          </span>
        </Title>
      }
      showClose={false}
      aria-describedby="modal-message"
      actions={[
        <Button onClick={onOk} key={1} variant={ButtonVariant.primary}>
          Ok
        </Button>,
      ]}
    >
      Your organization has reduced the number of users in Opt in to Ansible
      Lightspeed with IBM watsonx Code Assistant to {usersToRemove}. Please
      remove {usersToRemove} users to continue using the Opt in to Ansible
      Lightspeed with IBM watsonx Code Assistant subscription.
    </Modal>
  );
};

export { RemoveUsersModal };
