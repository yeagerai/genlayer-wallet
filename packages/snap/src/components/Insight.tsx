import type { SnapComponent } from '@metamask/snaps-sdk/jsx';
import { Box, Text, Row } from '@metamask/snaps-sdk/jsx';

import type { AdvancedOptionsFormProps } from './AdvancedOptionsForm';

export const Insight: SnapComponent<AdvancedOptionsFormProps> = ({
  values,
}) => {
  return (
    <Box>
      <Row label="Leader Timout">
        <Text>{values['leader-timeout-input']}</Text>
      </Row>
      <Row label="Validator Timout">
        <Text>{values['validator-timeout-input']}</Text>
      </Row>
      <Row label="Max. Genlayer Storage">
        <Text>{values['genlayer-storage-input']}</Text>
      </Row>
      <Row label="Max. Rollup Storage">
        <Text>{values['rollup-storage-input']}</Text>
      </Row>
      <Row label="Message gas configuration">
        <Text>{values['message-gas-input']}</Text>
      </Row>
    </Box>
  );
};
