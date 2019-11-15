import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { QuantityForm } from './QuantityForm';
import { AddToCart } from './AddToCart';
import { NavigationInjectedProps } from 'react-navigation';

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
interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  options: Array<{
    type: 'single' | 'multi';
    choices: Array<string>;
  }>;
}

const onAddToCart = ({ quantity }: { quantity: number }) => {};

export const ProductDetails: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { item }: { item: MenuItem } = navigation.state.params;

  const [quantity, setQuantity] = useState(1);

  return (
    <StyledView>
      <SafeAreaView>
        <Wrapper>
          <ScrollView>
            <ProductImage
              resizeMode="contain"
              source={{ uri: item.imageUrl }}
            />
            <Name>{item.name}</Name>
            <Description>{item.description}</Description>

            <QuantityForm
              value={quantity}
              onPlus={() => setQuantity(Math.min(quantity + 1, 10))}
              onMinus={() => setQuantity(Math.max(quantity - 1, 1))}
            />
          </ScrollView>
          <AddToCart
            price={item.price * quantity}
            onPress={() => onAddToCart({ quantity })}
          />
        </Wrapper>
      </SafeAreaView>
    </StyledView>
  );
};
