import React from 'react';
import styled from 'styled-components/native';
import { createOrder } from 'utils/network';
import { useStoreState } from 'store';

const Wrapper = styled.TouchableOpacity`
  background-color: orange;
  width: 100%;
  margin: 24px;
  border-radius: 4px;
  padding: 8px;
`;

const Title = styled.Text``;

export const CheckoutButton: React.FC<{ restaurantId: string }> = ({
  restaurantId,
}) => {
  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);
  const restaurantDetails = useStoreState(
    state => state.restaurantDetails.list[restaurantId]
  );

  const onPress = () => {
    createOrder({
      selections: cartSelection,
      restaurantId,
    });
  };

  return (
    <Wrapper onPress={onPress}>
      <Title>Checkout</Title>
    </Wrapper>
  );
};
