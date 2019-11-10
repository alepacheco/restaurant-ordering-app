import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: 12px;
`;

const TextWrapper = styled.View`
  margin: 12px;
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
`;
const SubTitle = styled.Text`
  text-align: justify;
  color: gray;
`;
const Price = styled.Text`
  font-weight: bold;
`;
const ProductImage = styled.Image`
  width: 84px;
  border-radius: 6px;
`;

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  image_url: string;
}

const onItemClick = ({
  productId,
  navigation,
}: {
  productId: string;
  navigation: any;
}) => {
  navigation.navigate('ProductDetails', { productId });
};

const Item: React.FC<MenuItem & { navigation: any }> = ({
  name,
  description,
  price,
  image_url,
  id,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onItemClick({ productId: id, navigation })}>
      <Wrapper>
        <ProductImage resizeMode="contain" source={{ uri: image_url }} />
        <TextWrapper>
          <Title>{name}</Title>
          <SubTitle>{description}</SubTitle>
          <Price>{price}</Price>
        </TextWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default withNavigation(Item);
