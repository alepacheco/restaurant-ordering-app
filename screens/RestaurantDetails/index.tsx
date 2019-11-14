import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails } from './utils';

const StyledView = styled.View`
  ${props => `background-color: ${props.theme.color};`}
  height: 100%;
`;

const RestaurantTitle = styled.Text`
  font-size: 38px;
`;
const BannerImage = styled.Image`
  height: 188px;
  width: 100%;
`;

const Details = styled.View`
  background-color: rgb(100, 100, 100);

  padding: 12px 12px 20px;
`;

export const RestaurantDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { id } = navigation.state.params;
  const [restaurantDetails, sertRestaurantDetails] = useState({
    bannerImgUrl:
      'https://file-examples.com/wp-content/uploads/2017/10/file_example_PNG_500kB.png',
    description: '',
    name: 'Loading',
    menu: [],
  });

  useEffect(() => {
    getRestaurantDetails({ restaurantId: id }).then(data =>
      sertRestaurantDetails(data)
    );
  }, [id]);

  return (
    <StyledView>
      <ScrollView>
        <BannerImage source={{ uri: restaurantDetails.bannerImgUrl }} />

        <Details>
          <RestaurantTitle>{restaurantDetails.name}</RestaurantTitle>
          <Text>{restaurantDetails.description}</Text>
        </Details>

        <Menu menu={restaurantDetails.menu} />
      </ScrollView>
    </StyledView>
  );
};
