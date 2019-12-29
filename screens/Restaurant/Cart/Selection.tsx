import React from 'react';
import styled from 'styled-components/native';
import { MenuItem } from 'types/restaurant';
import { Selection as SelectionType } from 'utils/models/cart';

const StyledView = styled.View`
  margin: 12px 24px;
  padding: 24px;
  background-color: ${props =>
    props.theme.colorScheme === 'light'
      ? props.theme.contrast1
      : props.theme.contrast2};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Information = styled.View`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledText = styled.Text`
  flex: 1;
  ${props => `color: ${props.theme.textColor};`}
`;

const StyledBold = styled.Text`
  flex: 1;
  font-weight: bold;
  ${props => `color: ${props.theme.textColor};`}
`;

const AmountText = styled.Text`
  margin: auto 8px auto 12px;
  min-width: 38px;
  font-weight: bold;
  ${props => `color: ${props.theme.textColor};`}
`;

const ProductImage = styled.Image`
  background-color: white;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  margin-right: 12px;
`;

const SelectedOption: React.FC<{ description: string; price: string }> = ({
  description,
  price,
}) => {
  return (
    <StyledText>
      - {description} {price}
    </StyledText>
  );
};

export const Selection: React.FC<{
  itemData: MenuItem;
  selectionData: SelectionType;
}> = ({ selectionData, itemData }) => {
  const choices = itemData.options.map(option => option.choices).flat();
  const selectedChoices = Object.values(selectionData.options)
    .flat()
    .map(choiceId => choices.find(choice => choice._id === choiceId));

  return (
    <StyledView>
      <AmountText>{selectionData.amount} x</AmountText>
      <ProductImage resizeMode="contain" source={{ uri: itemData.imageUrl }} />
      <Information>
        <StyledBold numberOfLines={1}>{itemData.name}</StyledBold>
        <StyledText>$ {itemData.price}</StyledText>
        {selectedChoices.map(choice => (
          <SelectedOption
            key={choice._id}
            description={choice.description}
            price={choice.price}
          />
        ))}
      </Information>
    </StyledView>
  );
};
