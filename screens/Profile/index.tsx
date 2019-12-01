import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { logOut } from 'utils/navigation';
import styled, { ThemeContext } from 'styled-components/native';
import { UserInfo } from './UserInfo';

const StyledView = styled.ScrollView`
  background-color: ${props =>
    props.theme.colorScheme === 'light' ? 'white' : props.theme.contrast1};
  ${props => `color: ${props.theme.textColor};`}
  height: 100%;
`;

const MenuWrapper = styled.TouchableOpacity`
  padding: 24px;
  margin-left: 12px;
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
`;

const Menu: React.FC<{ text: string; onPress: () => void }> = ({
  text,
  onPress,
}) => {
  return (
    <MenuWrapper onPress={onPress}>
      <StyledText>{text}</StyledText>
    </MenuWrapper>
  );
};

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <StyledView>
      <StatusBar barStyle={barStyle} />
      <UserInfo />
      <Menu text="⭐️ Favourites" onPress={() => {}} />
      <Separator />
      <Menu text="🛒 Orders" onPress={() => navigation.navigate('Orders')} />
      <Separator />
      <Menu text="⚙ Settings" onPress={() => navigation.navigate('Settings')} />
      <Separator />
      <Menu text="🔒 Log out" onPress={() => logOut({ navigation })} />
    </StyledView>
  );
};
