import React from 'react';
import styled from 'styled-components/native';
import { createOrder } from 'utils/network';
import { useStoreState } from 'store';
import { withNavigation } from 'react-navigation';
import { goToHome } from 'utils/navigation';

const Wrapper = styled.TouchableOpacity`
  background-color: orange;
  margin: 8px;
  border-radius: 6px;
  padding: 12px;
`;

const Title = styled.Text`
  margin: 0 auto;
`;

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
