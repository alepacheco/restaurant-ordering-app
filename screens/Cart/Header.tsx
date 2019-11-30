import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import ArrowLeft from 'assets/icons/arrow-left-solid.svg';

const StyledBackButton = styled(ArrowLeft)`
  width: 32px;
  height: 32px;
`;

const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 24px;
`;

const Wrapper = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
`;

const GoBack: React.FC<{ navigation: any }> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <StyledBackButton fill={themeContext.textColor} />
      </TouchableOpacity>
      <Title>Selected items</Title>
    </Wrapper>
  );
};

const _Header: React.FC<{ navigation: any }> = ({ navigation }) => {
  return <GoBack navigation={navigation} />;
};

export const Header = withNavigation(_Header);
