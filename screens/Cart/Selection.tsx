import React from 'react';

import styled from 'styled-components/native';
import { MenuItem } from 'types/restaurant';

const StyledView = styled.View`
  margin: 24px;
  background-color: gray;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: ${props => `${props.theme.color}`};
`;

const Information = styled.View`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.Text`
  flex: 1;
  ${props => `color: ${props.theme.textColor};`}
`;

export const Selection: React.FC<{
  itemData: MenuItem;
  selectionData: any;
}> = ({ selectionData, itemData }) => {
  return (
    <StyledView>
      <StyledText>{selectionData.amount} x</StyledText>

      <Information>
        <StyledText>{itemData.name}</StyledText>
        <StyledText>{itemData.price}</StyledText>
      </Information>
    </StyledView>
  );
};
