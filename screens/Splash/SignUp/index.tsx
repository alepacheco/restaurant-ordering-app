import React, { useState } from 'react';
import { Button } from 'react-native';
import { TextInput } from '../../../components/Forms/TextInput';
import styled from 'styled-components/native';
import { goToHome, resetNavigation } from '../utils';
import { signUp } from 'utils/network';

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
          autoCapitalize="words"
          autoCorrect={false}
          blurOnSubmit
          onChangeText={text => setName(text)}
          placeholder="name"
          value={name}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          onChangeText={text => setUsername(text)}
          placeholder="email"
          value={username}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          onChangeText={text => setPassword(text)}
          placeholder="password"
          returnKeyType="send"
          secureTextEntry
          value={password}
        />
      </InputForm>

      <Button title="sign up" onPress={onClickSignUp} />
    </StyledView>
  );
};
