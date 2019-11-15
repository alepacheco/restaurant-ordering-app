import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, Button, View, StatusBar } from 'react-native';
import { LogOutButton } from './LogOutButton';
import { getProfile, pickImage } from './utils';
import styled, { ThemeContext } from 'styled-components/native';
import { UserStats } from './UserStats';
import { Loading } from '../../components/Loading';
import { useStoreState, useStoreActions } from 'store';

interface User {
  name: string;
  bio?: string;
  imageUrl?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

const StyledView = styled.View`
  ${props => `background-color: ${props.theme.color};`}
  ${props => `color: ${props.theme.textColor};`}
height: 100%;
`;

const StyledText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
`;

const Name = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
  text-align: center;
  font-size: 34px;
`;

const Email = styled.Text`
  text-align: center;
  color: gray;
`;

const Bio = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
  text-align: center;
`;
const CenterPicture = styled.TouchableOpacity`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;
const ProfilePicture = styled.Image`
  border-radius: 64px;
  height: 128px;
  width: 128px;
`;

const ProfileWrapper = styled.View`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
`;

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const userData = useStoreState(state => state.user.user);
  const setUser = useStoreActions(actions => actions.user.setUser);

  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (userData === null) {
      getProfile().then(setUser);
    }
  }, [setUser, userData]);

  if (userData === null) {
    return <Loading />;
  }

  return (
    <StyledView>
      <SafeAreaView>
        <StatusBar barStyle={barStyle} />
        <ProfileWrapper>
          <CenterPicture onPress={() => pickImage(() => setUser(null))}>
            <ProfilePicture
              source={{
                uri:
                  userData.imageUrl ||
                  'https://storage.googleapis.com/barapp-data-images/images.png',
              }}
            />
          </CenterPicture>
          <Name>{userData.name}</Name>
          <Email>{userData.email}</Email>
          <Bio>{userData.bio}</Bio>
        </ProfileWrapper>
        <UserStats />

        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        <LogOutButton navigation={navigation} />
      </SafeAreaView>
    </StyledView>
  );
};
