import React, { useState } from 'react';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import { useStoreState } from 'store';

const AddToCartWrapper = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 2px;

  margin: 12px 12px 34px;
  padding: 12px;
`;
const AddToCartText = styled.Text`
  text-align: center;
  width: 100%;
`;
const AddToCartPrice = styled.Text`
  margin: 12px;
  width: 100%;

  position: absolute;
  text-align: right;
`;

const _CartBotton: React.FC<{ restaurantId: string; navigation: any }> = ({
  restaurantId,
  navigation,
}) => {
  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);

  const price = '1gbp';

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
      <AddToCartText>{numberOfItems} items in cart</AddToCartText>
      <AddToCartPrice>{price}</AddToCartPrice>
    </AddToCartWrapper>
  );
};

export const CartBotton = withNavigation(_CartBotton);
