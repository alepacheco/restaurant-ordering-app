import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import * as haptics from 'utils/haptics';

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
  ${props => `color: ${props.theme.textColor};`}

  font-size: 18px;
`;

const Price = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

  font-weight: bold;
`;
const ProductImage = styled.Image`
  width: 84px;
  height: 84px;

  border-radius: 6px;
`;

const onItemClick = ({
  navigation,
  restaurantId,
  itemId,
}: {
  itemId: string;
  navigation: NavigationScreenProp<{}>;
  restaurantId: string;
}) => {
  navigation.navigate('ProductDetails', { itemId, restaurantId });
};

interface ItemOptions {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  restaurantId: string;
}

const Item: React.FC<ItemOptions & { navigation: any }> = ({
  _id,
  restaurantId,
  navigation,
  imageUrl,
  description,
  price,
  name,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        haptics
          .selectionTouch()
          .then(() => onItemClick({ navigation, restaurantId, itemId: _id }))
      }>
      <Wrapper>
        <ProductImage
          resizeMode="contain"
          source={{
            uri:
              imageUrl ||
              'https://storage.googleapis.com/barapp-data-images/default-dish.jpg',
          }}
        />
        <TextWrapper>
          <Title>{name}</Title>
          <Price>${price}</Price>
        </TextWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default withNavigation(Item);
