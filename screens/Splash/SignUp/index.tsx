import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { TextInput } from '../../../components/Forms/TextInput';
import styled from 'styled-components/native';
import { signUp, goToHome, resetNavigation } from '../utils';

const InputForm = styled.View`
  margin: 24px 8px;
`;

const LoginText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

  margin-top: 38px;
  font-size: 34px;
  text-align: center;
`;

const StyledView = styled.SafeAreaView`
  height: 100%;
  ${props => `background-color: ${props.theme.color};`}
`;

export const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onClickSignUp = () =>
    signUp({ username, name, password })
      .then(() => goToHome(navigation))
      .catch(() => resetNavigation(navigation));

  return (
    <StyledView>
      <LoginText>Sign up</LoginText>
      <InputForm>
        <TextInput
          placeholder="name"
          onChangeText={text => setName(text)}
          value={name}
          autoCapitalize="words"
          autoCorrect={false}
          blurOnSubmit
        />
        <TextInput
          placeholder="email"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
        />
        <TextInput
          placeholder="password"
          onChangeText={text => setPassword(text)}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          secureTextEntry
          returnKeyType="send"
        />
      </InputForm>

      <Button title="sign up" onPress={onClickSignUp} />
    </StyledView>
  );
};
