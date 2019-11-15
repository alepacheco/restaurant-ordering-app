import React from 'react';
import {
  StoreProvider as EasyPeasyStoreProvider,
  createStore,
} from 'easy-peasy';
import store from './store';

const storeInstance = createStore(store);

export const StoreProvider: React.FC<{}> = ({ children }) => (
  <EasyPeasyStoreProvider store={storeInstance}>
    {children}
  </EasyPeasyStoreProvider>
);
