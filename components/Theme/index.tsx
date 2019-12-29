import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorScheme: 'dark' | 'light' | 'no-preference';
    color: string;
    textColor: string;

    contrast0_5: string;
    contrast0: string;
    contrast1: string;
    contrast2: string;
    contrast3: string;
    contrast4: string;
    contrast5: string;
    contrast6: string;
    contrast7: string;
    contrast8: string;
    contrast9: string;
    contrast10: string;
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
