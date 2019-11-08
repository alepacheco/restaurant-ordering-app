import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: 12px;
`;

const TextWrapper = styled.View`
  margin: 12px;
`;

const Title = styled.Text`
  font-size: 24px;
`;
const SubTitle = styled.Text`
  color: gray;
`;
const Price = styled.Text`
  font-weight: bold;
`;
const ProductImage = styled.Image`
  width: 84px;
  height: 84px;
  border-radius: 6px;
`;

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
}

const onItemClick = (id: number) => {};

export const Item: React.FC<MenuItem> = ({
  name,
  description,
  price,
  image,
  id,
}) => {
  return (
    <TouchableOpacity onPress={() => onItemClick(id)}>
      <Wrapper>
        <ProductImage source={{ uri: image }} />
        <TextWrapper>
          <Title>{name}</Title>
          <SubTitle>{description}</SubTitle>
          <Price>{price}</Price>
        </TextWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};
