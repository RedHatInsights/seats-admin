import {
  Label,
  Level,
  LevelItem,
  PageSection,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { VoidFunctionComponent } from 'react';

export type SeatsHeaderProps = {
  availableSeats: number;
  totalSeats: number;
};
export const SeatsHeader: VoidFunctionComponent<SeatsHeaderProps> = ({
  availableSeats,
  totalSeats,
}) => {
  return (
    <PageSection variant={'light'} hasShadowBottom={true}>
      <TextContent>
        <Title headingLevel={'h1'}>
          Ansible Lightspeed with IBM watsonx Code Assistant
        </Title>
        <Level>
          <LevelItem>
            <Text>
              This group contains all users assigned seats within your
              organization.
            </Text>
          </LevelItem>
          {totalSeats > 0 && (
            <LevelItem>
              <Text>
                Seats available:&nbsp;
                <Label isCompact={true}>
                  {availableSeats} of {totalSeats}
                </Label>
              </Text>
            </LevelItem>
          )}
        </Level>
      </TextContent>
    </PageSection>
  );
};
