import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { SafeAreaView, Text, Button, TextInput } from 'react-native';
import { SESSION_ID_KEY } from '../../constants/session';
import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';

const ButtonText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

  font-size: 18px;
  text-align: center;
`;

const CustomButton = styled.TouchableOpacity`
  margin: 12px;
  padding: 12px;
  background-color: rgb(0, 100, 200);
  border-radius: 8px;
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

export const Splash: React.FC<{ navigation: any }> = ({ navigation }) => {
  SecureStore.getItemAsync(SESSION_ID_KEY).then(sessionId => {
    if (sessionId) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      navigation.dispatch(resetAction);
    }
  });

  return (
    <StyledView>
      <LoginText>Welcome to bar app</LoginText>

      <CustomButton onPress={() => navigation.navigate('LogIn')}>
        <ButtonText>Log in</ButtonText>
      </CustomButton>
      <CustomButton onPress={() => navigation.navigate('SignUp')}>
        <ButtonText>Sign up</ButtonText>
      </CustomButton>
    </StyledView>
  );
};
