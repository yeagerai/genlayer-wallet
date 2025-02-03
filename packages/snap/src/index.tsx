import type {
  OnRpcRequestHandler,
  OnHomePageHandler,
  OnTransactionHandler,
  OnUserInputHandler,
} from '@metamask/snaps-sdk';
import { UserInputEventType, MethodNotFoundError } from '@metamask/snaps-sdk';

import type { AdvancedOptionsFormState } from './components';
import { AdvancedOptionsForm, TransactionConfig } from './components';
import { StateManager } from './libs/StateManager';

type RpcParams = {
  to?: string;
  [key: string]: any;
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const params = (request.params ? [0] : {}) as RpcParams;
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
  await StateManager.set('currentTo', transaction.to ?? 'default');

  const interfaceId = await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: <TransactionConfig />,
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
    const currentTo = await StateManager.get('currentTo');
    const value = event.value as AdvancedOptionsFormState;
    await StateManager.set(currentTo, value);
    await snap.request({
      method: 'snap_updateInterface',
      params: {
        id,
        ui: <TransactionConfig />,
      },
    });
  }
};
