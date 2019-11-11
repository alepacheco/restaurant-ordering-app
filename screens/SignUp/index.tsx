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

const signUp = async ({
  username,
  password,
  navigation,
  name,
}: {
  username: string;
  password: string;
  name: string;
  navigation: any;
}) => {
  try {
    const { data } = await axios.post(`${API_URL}/signup`, {
      name,
      password,
      email: username,
    });
    await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    navigation.dispatch(resetAction);
  } catch (err) {
    console.warn('Username or password invalid', err);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SplashNavigator' })],
    });
    navigation.dispatch(resetAction);
  }
};

export const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <LoginText>Sign up</LoginText>
      <InputForm>
        <Input
          placeholder="name"
          onChangeText={text => setName(text)}
          value={name}
        />
        <Input
          placeholder="email"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <Input
          placeholder="password"
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </InputForm>

      <Button
        title="sign up"
        onPress={() => signUp({ username, name, password, navigation })}
      />
    </SafeAreaView>
  );
};
