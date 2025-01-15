import type {
  OnRpcRequestHandler,
  OnHomePageHandler,
  OnTransactionHandler,
  OnUserInputHandler,
} from '@metamask/snaps-sdk';
import { UserInputEventType, MethodNotFoundError } from '@metamask/snaps-sdk';

import type { AdvancedOptionsFormState } from './components';
import { Insight } from './components';
import { AdvancedOptionsForm } from './components/AdvancedOptionsForm';
import { TransactionConfig } from './components/TransactionConfig';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
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
  const persistedData = (await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  })) as AdvancedOptionsFormState;

  const interfaceId = await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: <Insight values={persistedData} />,
      context: { transaction },
    },
  });

  return { id: interfaceId };
};

export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
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
        const persistedData = (await snap.request({
          method: 'snap_manageState',
          params: { operation: 'get' },
        })) as AdvancedOptionsFormState;
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: <AdvancedOptionsForm values={persistedData} />,
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
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: value,
      },
    });
    await snap.request({
      method: 'snap_updateInterface',
      params: {
        id,
        ui: <TransactionConfig />,
      },
    });
  }
};
