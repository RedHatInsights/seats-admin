import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Divider,
  PageSection,
  Split,
  SplitItem,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { VoidFunctionComponent } from 'react';
import { AppLink } from './AppLink';

export type AddUsersHeaderProps = {
  seatsAvailable: number;
  isAddDisabled: boolean;
  onAdd: () => void;
};
export const AddUsersHeader: VoidFunctionComponent<AddUsersHeaderProps> = ({
  seatsAvailable,
  isAddDisabled,
  onAdd,
}) => {
  return (
    <>
      <PageSection variant={'light'}>
        <Breadcrumb className={'pf-u-pb-md'}>
          <BreadcrumbItem>
            <AppLink to={'/'}>
              Ansible Lightspeed with IBM watsonx Code Assistant
            </AppLink>
          </BreadcrumbItem>
          <BreadcrumbItem>Add user(s)</BreadcrumbItem>
        </Breadcrumb>
        <TextContent>
          <Title headingLevel={'h1'}>Add user(s)</Title>

          <Split>
            <SplitItem isFilled={true}>
              <p>Your organization has {seatsAvailable} seats available.</p>
            </SplitItem>
            <Button isDisabled={isAddDisabled} onClick={onAdd}>
              Add
            </Button>
            <Button variant={'link'}>
              <AppLink to={'/'}>Cancel</AppLink>
            </Button>
          </Split>
        </TextContent>
      </PageSection>
      <Divider />
    </>
  );
};
