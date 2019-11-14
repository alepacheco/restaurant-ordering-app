import React from 'react';
import { Button } from 'react-native';
import { SESSION_ID_KEY } from '../../constants/session';
import * as SecureStore from 'expo-secure-store';
import { StackActions, NavigationActions } from 'react-navigation';

export const logOut = async ({ navigation }: any) => {
  await SecureStore.deleteItemAsync(SESSION_ID_KEY);

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SplashNavigator' })],
  });
  navigation.dispatch(resetAction);
};

export const LogOutButton: React.FC<{ navigation: any }> = ({ navigation }) => (
  <Button title="Log out" onPress={() => logOut({ navigation })} />
);
