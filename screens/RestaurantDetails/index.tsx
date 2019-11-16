import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails } from 'utils/network';
import { Loading } from 'components/Loading';
import { useStoreState, useStoreActions } from 'store';
import { Header } from './Header';
import { Layout } from './Layout';

const StyledView = styled.View`
  ${props => `background-color: ${props.theme.color};`}
  height: 100%;
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
    <Layout
      backgroundImageSource={{ uri: restaurantDetails.bannerImgUrl }}
      headerComponent={<Header name={restaurantDetails.name} />}>
      <StyledView>
        <Menu
          menu={restaurantDetails.menu}
          restaurantId={restaurantDetails._id}
        />
      </StyledView>
    </Layout>
  );
};
