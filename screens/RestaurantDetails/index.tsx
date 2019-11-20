import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Menu } from './Menu';
import { getRestaurantDetails } from 'utils/network';
import { Loading } from 'components/Loading';
import { useStoreState, useStoreActions } from 'store';
import { Header } from './Header';
import { Layout } from './Layout';
import { CartBotton } from './CartBotton';

const StyledView = styled.View`
  ${props => `background-color: ${props.theme.color};`}
  height: 100%;
`;

const FlexView = styled.View`
  display: flex;
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

  return (
    <FlexView>
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

      <CartBotton restaurantId={restaurantDetails._id} />
    </FlexView>
  );
};
