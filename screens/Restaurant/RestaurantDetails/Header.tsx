import React from 'react';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import ArrowLeft from 'assets/icons/arrow-left-solid.svg';

const RestaurantTitle = styled.Text`
  font-size: 24px;
  color: black;
  padding: 0 14px;
  text-align: center;
`;

const Details = styled.View`
  margin: 0 auto;
  display: flex;
  background-color: white;
  border-radius: 24px;
  opacity: 0.9;
`;

const BackButton = styled.TouchableWithoutFeedback`
  position: absolute;
`;

const StyledView = styled.View`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledBackButton = styled(ArrowLeft)`
  width: 32px;
  height: 32px;
`;

export const _Header: React.FC<{
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}> = ({ name, navigation }) => {
  return (
    <StyledView>
      <BackButton onPress={() => navigation.goBack()}>
        <StyledBackButton />
      </BackButton>
      <Details>
        <RestaurantTitle>{name}</RestaurantTitle>
      </Details>
    </StyledView>
  );
};

export const Header = withNavigation(_Header);
