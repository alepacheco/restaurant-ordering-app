import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useStoreState } from 'store';
import { Selection } from './Selection';
import { createOrder } from 'utils/network';
import { CheckoutButton } from './CheckoutButton';
import { Restaurant, MenuItem } from 'types/restaurant';
import { Header } from 'components/Header';
import { Selection as SelectionType } from 'utils/models/cart';

const StyledView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${props =>
    props.theme.colorScheme === 'light' ? 'white' : props.theme.contrast1};
`;

const Footer = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
`;

const TotalWrapper = styled.View`
  margin-top: 64px;
  display: flex;
  align-items: center;
`;

const ItemsScrollView = styled.ScrollView``;

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
  font-size: 16px;
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

export const priceItem = (item: SelectionType, menuItem: MenuItem) => {
  if (
    menuItem === undefined ||
    item === undefined ||
    item.amount < 1 ||
    menuItem.price == ''
  ) {
    throw new Error('Invalid order');
  }

  const extrasPrice = Object.keys(item.options)
    .map(optionId => {
      const thisOption = menuItem.options.find(
        option => option._id.toString() == optionId
      );
      const selectedChoises = item.options[optionId];

      return selectedChoises
        .map(selectedChoise => {
          return thisOption.choices.find(
            choice => choice._id.toString() == selectedChoise.toString()
          ).price;
        })
        .reduce((prev, curr) => prev + Number(curr), 0);
    })
    .reduce((prev, curr) => prev + curr, 0);

  const price = item.amount * (Number(menuItem.price) + extrasPrice);

  return price;
};

export const Cart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { restaurantId }: { restaurantId: string } = navigation.state.params;
  const cartSelection = useStoreState(state => state.cart.items[restaurantId]);
  const restaurantMenu = useStoreState(
    state => state.restaurantDetails.list[restaurantId].menu
  );
  const restaurantDetails = useStoreState(
    state => state.restaurantDetails.list[restaurantId]
  );

  const map = mapOfItemsFromRestaurant(restaurantDetails);

  const selectionEntries = cartSelection.map((item, index) => (
    <Selection key={index} selectionData={item} itemData={map[item.itemId]} />
  ));

  const calculateTotal = () => {
    const itemMap = restaurantMenu
      .map(section => section.items)
      .flat()
      .reduce((map, item) => {
        return {
          ...map,
          [item._id]: item,
        };
      }, {} as { [itemId: string]: MenuItem });

    return cartSelection
      .reduce((total, cartSelectionItem) => {
        return (
          total +
          priceItem(cartSelectionItem, itemMap[cartSelectionItem.itemId])
        );
      }, 0)
      .toFixed(2);
  };

  return (
    <StyledView>
      <Header title="Cart" />
      <ItemsScrollView>
        <View>{selectionEntries}</View>
        <TotalWrapper>
          <StyledText>Total: {calculateTotal()}</StyledText>
        </TotalWrapper>
      </ItemsScrollView>
      <Footer>
        <CheckoutButton restaurantId={restaurantId} />
      </Footer>
    </StyledView>
  );
};
