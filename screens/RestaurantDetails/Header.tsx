import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const RestaurantTitle = styled.Text`
  font-size: 24px;
  height: 100%;
`;

const Details = styled.SafeAreaView``;

export const Header: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <Details>
      <RestaurantTitle>{name}</RestaurantTitle>
    </Details>
  );
};
