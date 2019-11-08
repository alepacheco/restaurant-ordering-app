import React from 'react';
import { SafeAreaView, View, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';

const RestaurantTitle = styled.Text`
  font-size: 24px;
`;
const BannerImage = styled.Image`
  height: 128px;
  width: 100%;
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
  const { id } = navigation.state.params;

  return (
    <ScrollView>
      <BannerImage source={{ uri: restaurantData.bannerImage }} />
      <RestaurantTitle>{restaurantData.name}</RestaurantTitle>
      <Text>{restaurantData.description}</Text>
      <Menu menu={restaurantData.menu} />
    </ScrollView>
  );
};
