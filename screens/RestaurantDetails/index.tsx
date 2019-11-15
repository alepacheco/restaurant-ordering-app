import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails } from './utils';
import { Loading } from '../../components/Loading';
import { useStoreState, useStoreActions } from 'store';

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
  const { restaurantId }: { restaurantId: string } = navigation.state.params;
  const restaurantDetails = useStoreState(
    state => state.restaurantDetails.list[restaurantId]
  );
  const addRestaurant = useStoreActions(
    actions => actions.restaurantDetails.addRestaurant
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantDetails) {
      getRestaurantDetails({ restaurantId }).then(data => {
        addRestaurant(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [addRestaurant, restaurantDetails, restaurantId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledView>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
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
