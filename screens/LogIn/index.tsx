import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, TextInput } from 'react-native';
import {
  SESSION_ID_KEY,
  USER_EMAIL,
  USER_PASSWORD,
} from '../../constants/session';
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
  username,
  password,
  navigation,
}: {
  username: string;
  password: string;
  navigation: any;
}) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId);
    await SecureStore.setItemAsync(USER_EMAIL, username);
    await SecureStore.setItemAsync(USER_PASSWORD, password);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    navigation.dispatch(resetAction);
  } catch (err) {
    console.warn('Username or password incorrect');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SplashNavigator' })],
    });
    navigation.dispatch(resetAction);
  }
};

export const LogIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        onPress={() => loginNow({ navigation, username, password })}
      />
    </SafeAreaView>
  );
};
