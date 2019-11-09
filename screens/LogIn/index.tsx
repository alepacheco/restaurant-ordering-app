import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, TextInput } from 'react-native';
import { SESSION_ID_KEY } from '../../constants/session';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';

// @ts-ignore
import styled from 'styled-components/native';

const InputForm = styled.View`
  margin: 24px 8px;
`;

const Input = styled.TextInput`
  border: 1px solid;
  margin: 4px 12px;

  padding: 8px;
  border-radius: 6px;
`;

const LoginText = styled.Text`
  margin-top: 38px;
  font-size: 34px;
  text-align: center;
`;

import { API_URL } from '../../constants/network';

const loginNow = async ({
  reload,
  username,
  password,
}: {
  reload: (value: any) => void;
  username: string;
  password: string;
}) => {
  const { data } = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId);

  // Force the LogIn component to rerender
  reload(Math.random());
};

export const LogIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [, reload] = useState();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <LoginText>Log In to continue</LoginText>
      <InputForm>
        <Input
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <Input
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </InputForm>

      <Button
        title="Log in now"
        onPress={() => loginNow({ reload, username, password })}
      />
    </SafeAreaView>
  );
};
