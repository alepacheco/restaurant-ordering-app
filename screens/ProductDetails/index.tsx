import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { QuantityForm } from './QuantityForm';
import { AddToCart } from './AddToCart';
import { MenuItem } from 'types/restaurant';
import { useStoreState, useStoreActions } from 'store';
import * as haptics from 'utils/haptics';

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

interface ProductDetailsParams {
  itemId: string;
  restaurantId: string;
}

export const ProductDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const {
    itemId,
    restaurantId,
  }: ProductDetailsParams = navigation.state.params;

  const itemDetails: MenuItem = useStoreState(state =>
    state.restaurantDetails.list[restaurantId].menu
      .reduce((acc, item) => acc.concat(item.items), [] as Array<MenuItem>)
      .find(menuItem => menuItem._id === itemId)
  );

  const addToCart = useStoreActions(actions => actions.cart.add);

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
            onPress={async () => {
              await haptics.selectionTouch();
              addToCart({
                restaurantId,
                selection: {
                  amount: quantity,
                  itemId,
                  options: [],
                },
              });
              navigation.goBack();
            }}
          />
        </Wrapper>
      </SafeAreaView>
    </StyledView>
  );
};
