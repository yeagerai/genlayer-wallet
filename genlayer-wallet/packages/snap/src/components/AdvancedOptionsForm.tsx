import type { SnapComponent } from '@metamask/snaps-sdk/jsx';
import {
  Section,
  Button,
  Box,
  Field,
  Heading,
  Form,
  Input,
} from '@metamask/snaps-sdk/jsx';

export type AdvancedOptionsFormState = {
  'leader-timeout-input': string;
  'validator-timeout-input': string;
  'genlayer-storage-input': string;
  'rollup-storage-input': string;
  'message-gas-input': string;
};

export type AdvancedOptionsFormProps = {
  values: AdvancedOptionsFormState;
};

export const AdvancedOptionsForm: SnapComponent<AdvancedOptionsFormProps> = ({
  values,
}) => {
  return (
    <Box>
      <Section>
        <Heading>Advanced Options</Heading>
        <Form name="advanced-options-form">
          <Field label="Leader Timeout">
            <Input
              name="leader-timeout-input"
              type={'number'}
              min={1}
              placeholder="60 Sec"
              value={values['leader-timeout-input']}
            />
          </Field>
          <Field label="Validator Timeout">
            <Input
              name="validator-timeout-input"
              type={'number'}
              min={1}
              placeholder="30 Sec"
              value={values['validator-timeout-input']}
            />
          </Field>
          <Field label="Max. Genlayer Storage">
            <Input
              name="genlayer-storage-input"
              type={'number'}
              placeholder="12 GEN"
              value={values['genlayer-storage-input']}
            />
          </Field>
          <Field label="Max. Rollup Storage">
            <Input
              name="rollup-storage-input"
              type={'number'}
              placeholder="12 GEN"
              value={values['rollup-storage-input']}
            />
          </Field>
          <Field label="Message gas configuration">
            <Input
              name="message-gas-input"
              placeholder="JSON here (Editable)"
              value={values['message-gas-input']}
            />
          </Field>
          <Box direction={'horizontal'} alignment={'center'}>
            <Button variant={'destructive'} name="cancel_config">
              Cancel
            </Button>
            <Button type="submit" name="save_config">
              Save
            </Button>
          </Box>
        </Form>
      </Section>
    </Box>
  );
};
