import React, { useState } from 'react';
import { Text } from 'react-native';
import { TextInput } from 'components/Forms/TextInput';
import styled from 'styled-components/native';
import { goToHome, resetNavigation } from 'utils/navigation';
import { signUp } from 'utils/network';
import { Header } from 'components/Header';
import { WideButton } from 'components/Button/WideButton';
const InputForm = styled.View`
  flex: 1;
  margin: 12px 8px;
`;

const WideButtonWrapper = styled.View`
  margin: 42px 0;
`;

const LoginText = styled.View`
  margin: 12px 12px 0;
`;

const StyledView = styled.SafeAreaView`
  display: flex;
  flex: 1;

  flex-direction: column;
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
      <LoginText>
        <Header title="Sign up" />
      </LoginText>
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

      <WideButtonWrapper>
        <WideButton type="primary" onClick={onClickSignUp} text="Sign up" />
      </WideButtonWrapper>
    </StyledView>
  );
};
