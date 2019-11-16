import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { TextInput } from '../../../components/Forms/TextInput';
import { resetNavigation, goToHome } from '../utils';
import { loginNow } from 'utils/network';
import { NavigationScreenProp } from 'react-navigation';

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

export const LogIn: React.FC<{ navigation: NavigationScreenProp<{}> }> = ({
  navigation,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledView>
      <LoginText>Welcome back!</LoginText>
      <InputForm>
        <TextInput
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          blurOnSubmit
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          secureTextEntry
          returnKeyType="send"
        />
      </InputForm>

      <Button
        title="Log in now"
        onPress={() =>
          loginNow({ username, password })
            .then(() => goToHome(navigation))
            .catch(() => resetNavigation(navigation))
        }
      />
    </StyledView>
  );
};
