import type { SnapComponent } from '@metamask/snaps-sdk/jsx';
import {
  Box,
  Heading,
  Text,
  Bold,
  Section,
  Address,
  Divider,
  Button,
} from '@metamask/snaps-sdk/jsx';

export const TransactionConfig: SnapComponent = () => {
  return (
    <Box>
      <Box direction={'horizontal'} alignment={'center'}>
        <Heading size={'lg'}>Transaction Request</Heading>
      </Box>
      <Section>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>
            <Bold>Request from:</Bold>
          </Text>
          <Text>localhost:8080</Text>
        </Box>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>
            <Bold>Interacting with:</Bold>
          </Text>
          <Address address="0x37F91BBaaFB67C98Ac7238E2586cC7251A33f2a3" />
        </Box>
      </Section>
      <Section>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>
            <Bold>Amount:</Bold>
          </Text>
          <Text>22 GEN</Text>
        </Box>
      </Section>
      <Section>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>
            <Bold>Estimated Fee Range:</Bold>
          </Text>
          <Text>0.5 to 5.06 GEN</Text>
        </Box>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>GenLayer storage cost:</Text>
          <Text>0.01 GEN</Text>
        </Box>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>Rollup storage cost:</Text>
          <Text>0.01 GEN</Text>
        </Box>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>Leader timeout:</Text>
          <Text>~1 minute</Text>
        </Box>
        <Box direction="horizontal" alignment={'space-between'}>
          <Text>Validator timeout:</Text>
          <Text>~30 seconds</Text>
        </Box>
        <Divider />
        <Text>
          Note: Unused GEN will be returned to your account once the transaction
          is finalized.
        </Text>
      </Section>
      <Box center>
        <Button name="advanced_options">Show Advanced Options</Button>
      </Box>
    </Box>
  );
};
