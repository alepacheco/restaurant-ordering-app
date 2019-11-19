import React from 'react';
import { Router } from './components/Navigator';
import { Theme } from './components/Theme';
import { StoreProvider } from 'easy-peasy';
import { store } from 'store';
import { API_URL } from 'constants/network';
import axios from 'axios';
import { setSessionInAxios } from 'utils/network';

axios.defaults.baseURL = API_URL;

const App = () => {
  setSessionInAxios();
  return (
    <Theme>
      <StoreProvider store={store}>
        <Router />
      </StoreProvider>
    </Theme>
  );
};

export default App;
