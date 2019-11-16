import React, { useContext } from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import ArrowLeft from 'assets/icons/arrow-left-solid.svg';
import { useStoreState, useStoreActions } from 'store';
import { Selection } from './Selection';
import { Restaurant, MenuItem } from 'types/restaurant';

const StyledView = styled.SafeAreaView`
  ${props => `background-color: ${props.theme.color};`}
`;

const StyledBackButton = styled(ArrowLeft)`
  width: 32px;
  height: 32px;
`;

const StyledText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
`;

const GoBack: React.FC<{ navigation: any }> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <StyledBackButton fill={themeContext.textColor} />
    </TouchableOpacity>
  );
};

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
      <GoBack navigation={navigation} />
      <StyledText>Cart</StyledText>
      <StyledText>{JSON.stringify(cartSelection)}</StyledText>
      {selectionEntries}
    </StyledView>
  );
};
