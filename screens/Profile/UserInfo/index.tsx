import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { pickImage } from '../utils';
import { UserStats } from './UserStats';
import { useStoreState, useStoreActions } from 'store';
import { getProfile } from 'utils/network';
import { Loading } from 'components/Loading';

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
  margin-top: 88px;
  display: flex;
  flex-direction: column;
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

const StyledLoading = styled(Loading)`
  max-height: 100px;
`;

export const UserInfo = ({}) => {
  const userData = useStoreState(state => state.user.user);
  const setUser = useStoreActions(actions => actions.user.setUser);

  useEffect(() => {
    if (userData === null) {
      getProfile().then(setUser);
    }
  }, [setUser, userData]);

  const defaultedData = userData || {
    name: '..... .....',
    email: '.....@.......',
    bio: '...',
    imageUrl: 'https://storage.googleapis.com/barapp-data-images/images.png',
  };

  return (
    <View>
      <ProfileWrapper>
        <CenterPicture onPress={() => pickImage(() => setUser(null))}>
          <ProfilePicture
            source={{
              uri: defaultedData.imageUrl,
            }}
          />
        </CenterPicture>
        <Name>{defaultedData.name}</Name>
        <Email>{defaultedData.email}</Email>
        <Bio>{defaultedData.bio}</Bio>
      </ProfileWrapper>
      <UserStats />
    </View>
  );
};
