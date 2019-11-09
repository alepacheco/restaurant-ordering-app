import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails } from './utils';

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

const restaurantData = {
  name: 'McDonalds',
  description: `McDonald's Corporation is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States`,
  bannerImage: 'https://picsum.photos/400/400',
  menu: [
    {
      title: 'Burgers',
      items: [
        {
          id: '4i942u4ior',
          name: 'Big Mac',
          description: 'The original burger',
          price: '6£',
          image: 'https://picsum.photos/86/86',
        },
        {
          id: 're;ptro324j',
          name: 'Big Mac',
          description: 'The original burger',
          price: '6£',
          image: 'https://picsum.photos/86/86',
        },
        {
          id: '48340293hj',
          name: 'Big Mac',
          description: 'The original burger',
          price: '6£',
          image: 'https://picsum.photos/86/86',
        },
      ],
    },
    {
      title: 'Burgers',
      items: [
        {
          id: 'to43i94',
          name: 'Big Mac',
          description: 'The original burger',
          price: '6£',
          image: 'https://picsum.photos/86/86',
        },
      ],
    },
  ],
};

export const RestaurantDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [restaurantDetails, sertRestaurantDetails] = useState({
    bannerImage: 'https://picsum.photos/84/84',
    description: 'Loading',
    name: 'Loading',
  });
  const { id } = navigation.state.params;

  useEffect(() => {
    getRestaurantDetails({ restaurantId: id }).then(data =>
      sertRestaurantDetails(data)
    );
  }, []);

  return (
    <ScrollView bounces={false}>
      <BannerImage source={{ uri: restaurantDetails.bannerImage }} />

      <Details>
        <RestaurantTitle>{restaurantDetails.name}</RestaurantTitle>
        <Text>{restaurantDetails.description}</Text>
      </Details>

      <Menu menu={restaurantData.menu} />
    </ScrollView>
  );
};
