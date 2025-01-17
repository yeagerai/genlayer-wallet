import type { AdvancedOptionsFormState } from '../components';

export const getPersistedData = async () => {
  return (await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  })) as AdvancedOptionsFormState;
};
