import React from 'react';
import styled from 'styled-components/native';
import { createOrder } from 'utils/network';
import { useStoreState } from 'store';
import { withNavigation } from 'react-navigation';
import { goToHome } from 'utils/navigation';

const Wrapper = styled.TouchableOpacity`
  background-color: orange;
  width: 100%;
  margin: 24px;
  border-radius: 4px;
  padding: 8px;
`;

const Title = styled.Text``;

const _CheckoutButton: React.FC<{ restaurantId: string; navigation: any }> = ({
  restaurantId,
  navigation,
}) => {
  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);

  const onPress = async () => {
    await createOrder({
      selections: cartSelection,
      restaurantId,
    });

    goToHome(navigation);
    navigation.navigate('Orders');
  };

  return (
    <Wrapper onPress={onPress}>
      <Title>Checkout</Title>
    </Wrapper>
  );
};

export const CheckoutButton = withNavigation(_CheckoutButton);
