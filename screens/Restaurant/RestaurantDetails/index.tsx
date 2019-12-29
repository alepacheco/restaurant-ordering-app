import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails } from 'utils/network';
import { Loading } from 'components/Loading';
import { useStoreState, useStoreActions } from 'store';
import { Header } from 'components/Header';
import { CartBotton } from './CartBotton';
import { RestaurantLocation } from './RestaurantLocation';

const FlexView = styled.View`
  background-color: ${props =>
    props.theme.colorScheme === 'light' ? 'white' : props.theme.contrast1}
  display: flex;
  height: 100%;
`;

const RestaurantImage = styled.Image`
  height: 120px;
  border-radius: 12px;
`;

export const RestaurantDetails: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { restaurantId }: { restaurantId: string } = navigation.state.params;
  const restaurantDetails = useStoreState(
    state => state.restaurantDetails.list[restaurantId]
  );
  const addRestaurant = useStoreActions(
    actions => actions.restaurantDetails.addRestaurant
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (restaurantDetails === undefined) {
      setIsLoading(true);
      getRestaurantDetails({ restaurantId }).then(data => {
        addRestaurant(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [addRestaurant, restaurantDetails, restaurantId]);

  if (isLoading || restaurantDetails === undefined) {
    return <Loading />;
  }

  const { name, bannerImgUrl, menu, _id } = restaurantDetails;

  return (
    <FlexView>
      <ScrollView>
        <Header title={name} />
        <RestaurantImage
          resizeMode="cover"
          source={{
            uri:
              bannerImgUrl ||
              'https://storage.googleapis.com/barapp-data-images/default-dish.jpg',
          }}
        />
        <Menu menu={menu} restaurantId={_id} />
        <RestaurantLocation />
      </ScrollView>

      <CartBotton restaurantId={_id} />
    </FlexView>
  );
};
