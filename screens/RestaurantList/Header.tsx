import React from 'react';
import styled from 'styled-components/native';

const HeaderWrapper = styled.View`
  margin-top: 34px;
  background-color: ${props => props.theme.contrast0_5};
`;

const HeaderTitle = styled.Text`
  font-size: 34px;
  margin: 12px;
  ${props => `color: ${props.theme.textColor};`}
`;

export const Header = ({}) => {
  return (
    <HeaderWrapper>
      <HeaderTitle>Restaurants</HeaderTitle>
    </HeaderWrapper>
  );
};
