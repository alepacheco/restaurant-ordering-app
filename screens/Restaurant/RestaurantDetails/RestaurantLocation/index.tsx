import React from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { SubHeader } from 'components/Header/SubHeader';

const StyledMap = styled(MapView)`
  height: 380px;
  border-radius: 12px;
`;

const Wrapper = styled.View``;

export const RestaurantLocation = ({}) => {
  return (
    <Wrapper>
      <SubHeader title="Location" />
      <StyledMap />
    </Wrapper>
  );
};
