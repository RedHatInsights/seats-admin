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
import { Link } from 'react-router-dom';

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
            <Link to={'/'}>Seats Administration</Link>
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
              <Link to={'/'}>Cancel</Link>
            </Button>
          </Split>
        </TextContent>
      </PageSection>
      <Divider />
    </>
  );
};
