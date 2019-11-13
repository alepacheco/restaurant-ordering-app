import React, { Fragment } from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorScheme: 'dark' | 'light';
    color: string;
    textColor: string;
  }
}

export const Theme = ({ children }: { children: any }) => {
  return (
    <AppearanceProvider>
      <ThemeProvider
        theme={{
          colorScheme: useColorScheme(),
          ...theme({ colorScheme: useColorScheme() }),
        }}>
        {children}
      </ThemeProvider>
    </AppearanceProvider>
  );
};
