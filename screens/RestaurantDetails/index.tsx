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
  const { id } = navigation.state.params;
  const [menu, setMenu] = useState([]);
  const [restaurantDetails, sertRestaurantDetails] = useState({
    banner_img_url:
      'https://file-examples.com/wp-content/uploads/2017/10/file_example_PNG_500kB.png',
    description: 'Loading',
    name: 'Loading',
  });

  useEffect(() => {
    getRestaurantDetails({ restaurantId: id }).then(data =>
      sertRestaurantDetails(data)
    );

    getMenu({ restaurantId: id }).then(data => setMenu(data));
  }, []);

  return (
    <ScrollView>
      <BannerImage source={{ uri: restaurantDetails.banner_img_url }} />

      <Details>
        <RestaurantTitle>{restaurantDetails.name}</RestaurantTitle>
        <Text>{restaurantDetails.description}</Text>
      </Details>

      <Menu menu={menu} />
    </ScrollView>
  );
};
