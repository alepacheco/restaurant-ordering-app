import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, Button, View, StatusBar } from 'react-native';
import { LogOutButton } from './LogOutButton';
import { getProfile } from './utils';
import styled, { ThemeContext } from 'styled-components/native';

const StyledView = styled.View`
  ${props => `background-color: ${props.theme.color};`}
  ${props => `color: ${props.theme.textColor};`}
height: 100%;
`;

const StyledText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
`;

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';
  const userId = 1;

  useEffect(() => {
    if (userData === null) {
      getProfile({ userId }).then(setUserData);
    }
  }, []);
  return (
    <StyledView>
      <SafeAreaView>
        <StatusBar barStyle={barStyle} />

        <StyledText>This is your profile</StyledText>
        <StyledText>{JSON.stringify(userData)}</StyledText>
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        <LogOutButton navigation={navigation} />
      </SafeAreaView>
    </StyledView>
  );
};
