import React from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

const LocationText = styled.Text`
  color: ${props => props.theme.textColor};
`;

const StyledMap = styled(MapView)`
  margin-top: 38px;
  height: 280px;
`;

const Wrapper = styled.View`
  margin-top: 38px;
`;

export const RestaurantLocation = ({}) => {
  return (
    <Wrapper>
      <LocationText>Location</LocationText>
      <StyledMap />
    </Wrapper>
  );
};
