import React from 'react';
import { createAppContainer } from 'react-navigation';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native';
import { Navigator } from './components/Navigator';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorScheme: string;
  }
}

const Router = createAppContainer(Navigator);

const App = () => (
  <AppearanceProvider>
    <ThemeProvider
      theme={{
        colorScheme: useColorScheme(),
      }}>
      <Router />
    </ThemeProvider>
  </AppearanceProvider>
);

export default App;
