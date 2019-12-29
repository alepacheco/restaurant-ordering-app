import { Keyboard } from 'react-native';
import { TextInput } from 'components/Forms/TextInput';
import { resetNavigation, goToHome } from 'utils/navigation';
import { loginNow } from 'utils/network';
import { NavigationScreenProp } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect, useContext } from 'react';
import { SESSION_ID_KEY } from 'constants/session';
import { Loading } from 'components/Loading';
import { StatusBar } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { WideButton } from 'components/Button/WideButton';

const InputForm = styled.View`
  margin: 24px 8px;
  flex: 1;
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  display: flex;
`;
const LoginText = styled.Text`
  margin-top: 38px;
  font-size: 34px;
  text-align: center;
  ${props => `color: ${props.theme.textColor};`}
`;

const DontAccount = styled.Text`
  text-align: center;
  ${props => `color: ${props.theme.textColor};`}
`;

const LogInText = styled.Text`
  text-align: center;
  ${props => `color: ${props.theme.color};`}
`;

const ForgotPass = styled.Text`
  text-align: right;
  margin: 5px 15px;
  ${props => `color: ${props.theme.textColor};`}
`;

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 100px;
  padding-bottom: 32px;
  background-color: ${props => props.theme.contrast0_5};
`;
const LogInButton = styled.TouchableOpacity`
  margin: 4px 18px;
  background-color: blue;
  border-radius: 6px;
  padding: 10px;
`;

const SignUpButton = styled.TouchableOpacity`
  margin: 4px 18px;
  padding: 10px;
`;

export const LogIn: React.FC<{ navigation: NavigationScreenProp<{}> }> = ({
  navigation,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    SecureStore.getItemAsync(SESSION_ID_KEY).then(sessionId => {
      setIsLoading(false);

      if (sessionId) {
        goToHome(navigation);
      }
    });
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar barStyle={barStyle} />

        <LoginText>FeaT</LoginText>
        <InputForm>
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
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
            <ForgotPass>Forgot password?</ForgotPass>
          </TouchableOpacity>
        </InputForm>

        <WideButton
          type="primary"
          text="Log In"
          onClick={async () => {
            setIsLoading(true);
            try {
              await loginNow({ username, password });
              goToHome(navigation);
            } catch (error) {
              resetNavigation(navigation);
            }
          }}>
          <LogInText></LogInText>
        </WideButton>

        <SignUpButton onPress={() => navigation.navigate('SignUp')}>
          <DontAccount>Don&apos;t have an account?</DontAccount>
        </SignUpButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};
