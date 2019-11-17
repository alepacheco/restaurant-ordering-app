import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import { SESSION_ID_KEY } from 'constants/session';
import styled from 'styled-components/native';
import { goToHome } from 'utils/navigation';
import { Loading } from 'components/Loading';
import { NavigationScreenProp } from 'react-navigation';

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

export const Splash: React.FC<{ navigation: NavigationScreenProp<{}> }> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);

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
