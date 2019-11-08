import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { SESSION_ID_KEY } from '../../constants/session';

const loginNow = async ({ reload }) => {
  await SecureStore.setItemAsync(SESSION_ID_KEY, 'mySessionId');

  // Force the LogIn component to rerender
  reload(Math.random());
};

export const LogIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [, reload] = useState();

  useEffect(() => {
    SecureStore.getItemAsync(SESSION_ID_KEY).then(sessionId => {
      if (sessionId) {
        navigation.navigate('Home');
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
