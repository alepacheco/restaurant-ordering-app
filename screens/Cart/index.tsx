import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useStoreState } from 'store';
import { Selection } from './Selection';
import { createOrder } from 'utils/network';
import { CheckoutButton } from './CheckoutButton';
import { Restaurant, MenuItem } from 'types/restaurant';
import { Header } from './Header';

const StyledView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #eeeeee;
`;

const Footer = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  ${props => `background-color: ${props.theme.color};`}
`;

const ItemsScrollView = styled.ScrollView``;

const StyledText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
`;

const mapOfItemsFromRestaurant = (
  restaurant: Restaurant
): { [itemId: string]: MenuItem } => {
  const itemsForRestaurant = restaurant.menu.reduce(
    (acc, item) => [...acc, ...item.items],
    [] as MenuItem[]
  );

  return itemsForRestaurant.reduce(
    (acc, item) => ({
      ...acc,
      [item._id]: item,
    }),
    {} as { [itemId: string]: MenuItem }
  );
};

export const Cart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { restaurantId }: { restaurantId: string } = navigation.state.params;

  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);
  const restaurantDetails = useStoreState(
    state => state.restaurantDetails.list[restaurantId]
  );

  const map = mapOfItemsFromRestaurant(restaurantDetails);

  const selectionEntries = cartSelection.map((item, index) => (
    <Selection key={index} selectionData={item} itemData={map[item.itemId]} />
  ));

  return (
    <StyledView>
      <Header />
      <ItemsScrollView>
        <View>{selectionEntries}</View>
        <StyledText>Total: XXX</StyledText>
      </ItemsScrollView>
      <Footer>
        <CheckoutButton restaurantId={restaurantId} />
      </Footer>
    </StyledView>
  );
};
