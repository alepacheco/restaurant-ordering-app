import { createStore, createTypedHooks } from 'easy-peasy';
import model from './models';

const {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
  useStore,
} = createTypedHooks<typeof model>();

export { useStoreActions, useStoreState, useStoreDispatch, useStore };

export const store = createStore(model);

export default store;
