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
  margin: 8px;
  background-color: ${props =>
    props.theme.colorScheme === 'light'
      ? props.theme.contrast0_5
      : props.theme.contrast2};
  border-radius: 6px;
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
      <Menu text="🛒 Orders" onPress={() => navigation.navigate('Orders')} />
      <Menu
        text="💳 Payment Details"
        onPress={() => navigation.navigate('PaymentDetails')}
      />
      <Menu text="⚙ Settings" onPress={() => navigation.navigate('Settings')} />
      <Menu text="🔒 Log out" onPress={() => logOut({ navigation })} />
    </StyledView>
  );
};
