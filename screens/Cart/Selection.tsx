import React from 'react';
import styled from 'styled-components/native';
import { MenuItem } from 'types/restaurant';

const StyledView = styled.View`
  margin: 12px 24px;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  border-top-color: gray;
  border-bottom-color: gray;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Information = styled.View`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.Text`
  flex: 1;
  ${props => `color: ${props.theme.textColor};`}
`;

const AmountText = styled.Text`
  margin: auto 8px auto 12px;
  min-width: 38px;
  ${props => `color: ${props.theme.textColor};`}
`;

const ProductImage = styled.Image`
  width: 42px;
  height: 100%;
  border-radius: 6px;
`;

export const Selection: React.FC<{
  itemData: MenuItem;
  selectionData: any;
}> = ({ selectionData, itemData }) => {
  return (
    <StyledView>
      <AmountText>{selectionData.amount} x</AmountText>
      <ProductImage resizeMode="contain" source={{ uri: itemData.imageUrl }} />
      <Information>
        <StyledText>{itemData.name}</StyledText>
        <StyledText>{itemData.price}</StyledText>
      </Information>
    </StyledView>
  );
};
