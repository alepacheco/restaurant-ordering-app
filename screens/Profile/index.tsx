import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, Button, View, StatusBar } from 'react-native';
import { LogOutButton } from './LogOutButton';
import { getProfile, uploadFile } from './utils';
import styled, { ThemeContext } from 'styled-components/native';
import { SESSION_ID_KEY } from '../../constants/session';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { logOut } from './LogOutButton';
import { UserStats } from './UserStats';
import { Loading } from '../../components/Loading';

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

const getPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return false;
    }
  }

  return true;
};

const pickImage = async (callback: () => void) => {
  await getPermission();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.cancelled === false && result.uri) {
    await uploadFile(result.uri);
    callback();
  }
};

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userData, setUserData] = useState(null as User | null);
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (userData === null) {
      (async () => {
        const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);
        try {
          const profileData = await getProfile({ sessionId });
          setUserData(profileData);
        } catch (error) {
          logOut({ navigation });
        }
      })();
    }
  }, [navigation, userData]);

  if (userData === null) {
    return <Loading />;
  }

  return (
    <StyledView>
      <SafeAreaView>
        <StatusBar barStyle={barStyle} />

        <ProfileWrapper>
          <CenterPicture onPress={() => pickImage(() => setUserData(null))}>
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
