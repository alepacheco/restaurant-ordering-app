import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { SESSION_ID_KEY } from '../../constants/session';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const loginNow = async ({ reload }) => {
  const { data } = await axios.post(`${API_URL}/login`, {
    username: 'admin',
    password: 'admin',
  });

  await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId);

  // Force the LogIn component to rerender
  reload(Math.random());
};

export const LogIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [, reload] = useState();

  useEffect(() => {
    SecureStore.getItemAsync(SESSION_ID_KEY).then(sessionId => {
      if (sessionId) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        navigation.dispatch(resetAction);
      }
    });
  });

  return (
    <SafeAreaView>
      <Text>LogIn to continue</Text>
      <Button title="Log in now" onPress={() => loginNow({ reload })} />
    </SafeAreaView>
  );
};
