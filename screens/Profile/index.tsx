import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { logOut } from 'utils/navigation';
import styled, { ThemeContext } from 'styled-components/native';
import { UserInfo } from './UserInfo';
import { WideButton } from 'components/Button/WideButton';

const StyledView = styled.ScrollView`
  background-color: ${props => props.theme.contrast0_5};
  ${props => `color: ${props.theme.textColor};`}
  height: 100%;
`;

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colorScheme } = useContext(ThemeContext);
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <StyledView>
      <StatusBar barStyle={barStyle} />
      <UserInfo />
      <WideButton
        text="🛒  Orders"
        onClick={() => navigation.navigate('Orders')}
        type="list"
      />
      <WideButton
        text="💳  Payment Details"
        onClick={() => navigation.navigate('PaymentDetails')}
        type="list"
      />
      <WideButton
        text="🛎  Get help"
        onClick={() => navigation.navigate('Settings')}
        type="list"
      />
      <WideButton
        text="🔒  Log out"
        onClick={() => logOut({ navigation })}
        type="list"
      />
    </StyledView>
  );
};
