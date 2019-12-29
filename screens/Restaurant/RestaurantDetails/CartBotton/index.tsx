import React, { useState } from 'react';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import { useStoreState } from 'store';

const AddToCartWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: orange;
  border-radius: 6px;

  margin: 12px 12px 34px;
  padding: 12px;
`;
const AddToCartText = styled.Text`
  text-align: center;
  flex: 1;
`;

const QuantityText = styled.Text`
  text-align: center;
  margin: auto 0;
`;

const QuantityBackground = styled.View`
  background-color: #ddddff;
  min-width: 24px;
  height: 24px;
  margin-top: -8px;
  margin-bottom: -8px;
  border-radius: 6px;
`;

const QuantityWrapper = styled.View`
  text-align: left;
  flex: 1;
  align-items: flex-start;
  margin: auto 0;
`;

const AddToCartPrice = styled.Text`
  flex: 1;
  text-align: right;
`;

const _CartBotton: React.FC<{ restaurantId: string; navigation: any }> = ({
  restaurantId,
  navigation,
}) => {
  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);

  const price = '';

  if (!cartSelection || cartSelection.length === 0) {
    return null;
  }

  const numberOfItems = cartSelection.reduce(
    (result, item) => item.amount + result,
    0
  );

  return (
    <AddToCartWrapper
      onPress={() => navigation.navigate('Cart', { restaurantId })}>
      <QuantityWrapper>
        <QuantityBackground>
          <QuantityText>{numberOfItems}</QuantityText>
        </QuantityBackground>
      </QuantityWrapper>
      <AddToCartText>View cart</AddToCartText>
      <AddToCartPrice>{price}</AddToCartPrice>
    </AddToCartWrapper>
  );
};

export const CartBotton = withNavigation(_CartBotton);
