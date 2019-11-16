import React from 'react';

import styled from 'styled-components/native';
import { MenuItem } from 'types/restaurant';

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${props => `${props.theme.color}`};
`;
const StyledImage = styled.Image`
  height: 64px;
  width: 64px;
`;
const StyledText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
`;

export const Selection: React.FC<{
  itemData: MenuItem;
  selectionData: any;
}> = ({ selectionData, itemData }) => {
  return (
    <StyledView>
      <StyledImage source={{ uri: itemData.imageUrl }} />
      <StyledText>{itemData.name}</StyledText>
      <StyledText>{itemData.description}</StyledText>
      <StyledText>{itemData.price}</StyledText>
    </StyledView>
  );
};
