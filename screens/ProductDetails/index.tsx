import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { QuantityForm } from './QuantityForm';
import { AddToCart } from './AddToCart';
import { NavigationInjectedProps } from 'react-navigation';
import { MenuItem } from 'types/restaurant';
import { useStoreState, useStoreActions } from 'store';
const StyledView = styled.View`
  ${props => `background-color: ${props.theme.color};`}
`;

const ProductImage = styled.Image`
  height: 84px;
`;

const Name = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

  font-size: 28px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: 18px;
  color: gray;
`;

const Wrapper = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProductDetails: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const {
    itemId,
    restaurantId,
  }: { itemId: string; restaurantId: string } = navigation.state.params;

  const itemDetails: MenuItem = useStoreState(state =>
    state.restaurantDetails.list[restaurantId].menu
      .reduce((acc, item) => acc.concat(item.items), [] as Array<MenuItem>)
      .find(menuItem => menuItem._id === itemId)
  );

  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);
  const addToCart = useStoreActions(actions => actions.cart.add);

  console.log(cartSelection);
  const [quantity, setQuantity] = useState(1);

  return (
    <StyledView>
      <SafeAreaView>
        <Wrapper>
          <ScrollView>
            <ProductImage
              resizeMode="contain"
              source={{ uri: itemDetails.imageUrl }}
            />
            <Name>{itemDetails.name}</Name>
            <Description>{itemDetails.description}</Description>

            <QuantityForm onChange={setQuantity} initialValue={quantity} />
          </ScrollView>
          <AddToCart
            price={(Number(itemDetails.price) * quantity).toFixed(2)}
            onPress={() =>
              addToCart({
                restaurantId,
                items: {
                  amount: quantity,
                  itemId,
                  options: [],
                },
              })
            }
          />
        </Wrapper>
      </SafeAreaView>
    </StyledView>
  );
};
