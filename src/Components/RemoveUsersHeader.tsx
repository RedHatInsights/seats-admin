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

export type RemoveUsersHeaderProps = {
  usersToRemove: number;
  isRemoveDisabled: boolean;
  onRemove: () => void;
};
export const RemoveUsersHeader: VoidFunctionComponent<
  RemoveUsersHeaderProps
> = ({ usersToRemove, isRemoveDisabled, onRemove }) => {
  return (
    <>
      <PageSection variant={'light'}>
        <Breadcrumb className={'pf-u-pb-md'}>
          <BreadcrumbItem>
            <Link to={'/'}>Seats Administration</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Remove users</BreadcrumbItem>
        </Breadcrumb>
        <TextContent>
          <Split>
            <SplitItem isFilled={true}>
              <Title headingLevel={'h1'}>
                Remove {usersToRemove} users from their assigned seats seats
              </Title>
            </SplitItem>
            <Button isDisabled={isRemoveDisabled} onClick={onRemove}>
              Remove
            </Button>
          </Split>
        </TextContent>
      </PageSection>
      <Divider />
    </>
  );
};
