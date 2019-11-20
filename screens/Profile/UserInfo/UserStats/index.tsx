import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.SafeAreaView`
  margin: 24px;
  display: flex;
  flex-direction: row;
`;

const StatBox = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StatNumber = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
  text-align: center;
  font-size: 32px;
`;

const StatLabel = styled.Text`
  text-align: center;
  font-size: 18px;
  color: gray;
`;

export const UserStats = () => {
  return (
    <StyledView>
      <StatBox>
        <StatNumber>12</StatNumber>
        <StatLabel>Orders</StatLabel>
      </StatBox>
      <StatBox>
        <StatNumber>4.7 ★</StatNumber>
        <StatLabel>Stars</StatLabel>
      </StatBox>
      <StatBox>
        <StatNumber>7</StatNumber>
        <StatLabel>Venues</StatLabel>
      </StatBox>
    </StyledView>
  );
};
