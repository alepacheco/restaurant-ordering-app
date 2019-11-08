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
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
}

const onItemClick = ({ id, navigation }: { id: string; navigation: any }) => {
  navigation.navigate('ProductDetails');
};

const Item: React.FC<MenuItem & { navigation: any }> = ({
  name,
  description,
  price,
  image,
  id,
  navigation,
}) => {
  return (
    <TouchableOpacity onPress={() => onItemClick({ id, navigation })}>
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

export default withNavigation(Item);
