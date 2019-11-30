import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { TextInput } from 'components/Forms/TextInput';
import { resetNavigation, goToHome } from 'utils/navigation';
import { loginNow } from 'utils/network';
import { NavigationScreenProp } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

const InputForm = styled.View`
  margin: 24px 8px;
`;

const Separator = styled.View`
  margin: 30px 0 30px;
  display: flex;
  height: 5px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const LoginText = styled.Text`
  margin-top: 38px;
  font-size: 34px;
  text-align: center;
  ${props => `color: ${props.theme.textColor};`}
`;

const StyledView = styled.SafeAreaView`
  height: 100%;
  ${props => `background-color: ${props.theme.color};`}
`;

const DontAccount = styled.Text`
  text-align: center;
  ${props => `color: ${props.theme.textColor};`}
`;

const LogInText = styled.Text`
  text-align: center;
  ${props => `color: ${props.theme.textColor};`}
`;

const ForgotPass = styled.Text`
  text-align: right;
  margin: 5px 15px;
  ${props => `color: ${props.theme.textColor};`}
`;

const Container = styled.View`
  margin-top: 200px;
`;
const LogInButton = styled.TouchableOpacity`
  background-color: blue;
  border-radius: 6px;
  padding: 10px;
`;

export const LogIn: React.FC<{ navigation: NavigationScreenProp<{}> }> = ({
  navigation,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledView>
      <Container>
        <LoginText>FeaT</LoginText>
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
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
              <ForgotPass>Forgot password?</ForgotPass>
            </TouchableOpacity>
          </View>
        </InputForm>
        <LogInButton
          onPress={() =>
            loginNow({ username, password })
              .then(() => goToHome(navigation))
              .catch(() => resetNavigation(navigation))
          }>
          <LogInText>Log In</LogInText>
        </LogInButton>

        <Separator />

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <DontAccount>Don&apos;t have an account?</DontAccount>
          </TouchableOpacity>
        </View>
      </Container>
    </StyledView>
  );
};
