import type {
  OnRpcRequestHandler,
  OnHomePageHandler,
  OnTransactionHandler,
  OnUserInputHandler,
} from '@metamask/snaps-sdk';
import { UserInputEventType, MethodNotFoundError } from '@metamask/snaps-sdk';
import { decodeRlp, getBytes } from 'ethers';

import type { AdvancedOptionsFormState } from './components';
import { Insight, AdvancedOptionsForm, TransactionConfig } from './components';
import { StateManager } from './libs/StateManager';

type RpcParams = {
  to?: string;
  [key: string]: any;
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const params = request.params ? (request.params as RpcParams) : {};
  await StateManager.set('currentTo', params.to);
  switch (request.method) {
    case 'transaction_config': {
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: <TransactionConfig />,
        },
      });
    }

    default:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new MethodNotFoundError({
        method: request.method,
      });
  }
};

export const onHomePage: OnHomePageHandler = async () => {
  return { content: <TransactionConfig /> };
};

export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const persistedData = (await StateManager.get(
    transaction.to,
  )) as AdvancedOptionsFormState;

  console.log('Original Transaction:', transaction);
  const decodedData = decodeRlp(transaction.data) as string[];
  console.log('Transaction Decoded:', decodedData);
  const deserializedData = decodedData.map((item: string) => {
    const decodedTransaction = getBytes(item);
    return new TextDecoder().decode(decodedTransaction);
  });
  console.log('Deserialized Data:', deserializedData);

  // Here we could change the transaction including more info/parameters to send to our RPC

  const interfaceId = await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: <Insight values={persistedData} />,
      context: { transaction }, // here we need to change the context with the new modified transaction
    },
  });

  return { id: interfaceId };
};

export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  if (
    event.type === UserInputEventType.InputChangeEvent &&
    event.name === 'number-of-appeals'
  ) {
    const currentTo = await StateManager.get('currentTo');
    const persistedData = (await StateManager.get(currentTo)) || {};
    persistedData['number-of-appeals'] = event.value as string;
    await snap.request({
      method: 'snap_updateInterface',
      params: {
        id,
        ui: <AdvancedOptionsForm values={persistedData || {}} />,
      },
    });
  }
  if (event.type === UserInputEventType.ButtonClickEvent) {
    switch (event.name) {
      case 'cancel_config':
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: <TransactionConfig />,
          },
        });
        break;

      case 'advanced_options':
        // eslint-disable-next-line no-case-declarations
        const currentTo = await StateManager.get('currentTo');
        // eslint-disable-next-line no-case-declarations
        const persistedData = (await StateManager.get(
          currentTo,
        )) as AdvancedOptionsFormState;
        console.log(persistedData);
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: <AdvancedOptionsForm values={persistedData || {}} />,
          },
        });
        break;

      default:
        break;
    }
  }

  if (
    event.type === UserInputEventType.FormSubmitEvent &&
    event.name === 'advanced-options-form'
  ) {
    const value = event.value as AdvancedOptionsFormState;
    await StateManager.set('default', value);
    await snap.request({
      method: 'snap_updateInterface',
      params: {
        id,
        ui: <TransactionConfig />,
      },
    });
  }
};
