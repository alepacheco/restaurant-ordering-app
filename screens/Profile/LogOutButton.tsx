import React from 'react';
import { Button } from 'react-native';
import { SESSION_ID_KEY } from '../../constants/session';
import * as SecureStore from 'expo-secure-store';

const logOut = async ({ navigation }) => {
  await SecureStore.deleteItemAsync(SESSION_ID_KEY);
  navigation.navigate('LogIn');
};

export const LogOutButton: React.FC<{ navigation: any }> = ({ navigation }) => (
  <Button title="Log out" onPress={() => logOut({ navigation })} />
);
