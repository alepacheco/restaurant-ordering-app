import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails, getMenu } from './utils';

const RestaurantTitle = styled.Text`
  font-size: 38px;
`;
const BannerImage = styled.Image`
  height: 188px;
  width: 100%;
`;

const Details = styled.View`
  background-color: rgba(3, 3, 3, 0.3);

  padding: 12px 12px 20px;
`;

export const RestaurantDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [menu, setMenu] = useState([]);
  const [restaurantDetails, sertRestaurantDetails] = useState({
    bannerImage: 'https://picsum.photos/24/24',
    description: 'Loading',
    name: 'Loading',
  });
  const { id } = navigation.state.params;

  useEffect(() => {
    getRestaurantDetails({ restaurantId: id }).then(data =>
      sertRestaurantDetails(data)
    );

    getMenu({ restaurantId: id }).then(data => setMenu(data));
  }, []);

  return (
    <ScrollView bounces={false}>
      <BannerImage source={{ uri: restaurantDetails.bannerImage }} />

      <Details>
        <RestaurantTitle>{restaurantDetails.name}</RestaurantTitle>
        <Text>{restaurantDetails.description}</Text>
      </Details>

      <Menu menu={menu} />
    </ScrollView>
  );
};
