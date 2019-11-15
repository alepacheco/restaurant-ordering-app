import React from 'react';
import { Router } from './components/Navigator';
import { Theme } from './components/Theme';
import { StoreProvider } from './components/StoreProvider';

const App = () => (
  <Theme>
    <StoreProvider>
      <Router />
    </StoreProvider>
  </Theme>
);

export default App;
