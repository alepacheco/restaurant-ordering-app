import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Title = styled.Text``;
const SubTitle = styled.Text``;
const Price = styled.Text``;

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  image: string;
}

export const Item: React.FC<MenuItem> = ({
  name,
  description,
  price,
  image,
}) => {
  return (
    <View>
      <Title>{name}</Title>
      <SubTitle>{description}</SubTitle>
      <Price>{price}</Price>
    </View>
  );
};
