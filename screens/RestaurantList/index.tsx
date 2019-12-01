import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import styled, { ThemeContext } from 'styled-components/native';
import { getNearbyRestaurants, getProfile } from 'utils/network';
import { Loading } from '../../components/Loading';
import { NoRestaurants } from './NoRestaurants';
import { useStoreActions, useStoreState } from 'store';
import { NearbyRestaurant } from 'types/restaurant';
import { getLocation } from 'utils/location';
import { Header } from './Header';

const StyledView = styled.View`
  background-color: ${props => props.theme.contrast0_5};
`;

const StyledFlatList = styled(FlatList)`
  margin-bottom: 106px;
`;

const Wrapper = styled.View`
  height: 100%;
  ${props => `background-color: ${props.theme.color};`}
`;

export const RestaurantList = ({}) => {
  const nearbyRestaurants = useStoreState(
    state => state.nearbyRestaurants.list
  );
  const setRestaurants = useStoreActions(
    actions => actions.nearbyRestaurants.setRestaurants
  );

  const userData = useStoreState(state => state.user.user);
  const setUser = useStoreActions(actions => actions.user.setUser);
  const setLocation = useStoreActions(actions => actions.user.setLocation);

  const [isLoading, setIsLoading] = useState(true);
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      getProfile().then(setUser);
      getLocation().then(setLocation);
    }

    if (isLoading && userData.location) {
      getNearbyRestaurants(userData.location).then(restaurants => {
        setRestaurants(restaurants);
        setIsLoading(false);
      });
    }
  }, [isLoading, setLocation, setRestaurants, setUser, userData]);

  if (nearbyRestaurants === null) {
    return <Loading />;
  }

  if (nearbyRestaurants.length === 0) {
    return (
      <Wrapper>
        <Header />
        <NoRestaurants />
      </Wrapper>
    );
  }

  return (
    <StyledView>
      <StatusBar barStyle={barStyle} />

      <Header />
      <StyledFlatList
        data={nearbyRestaurants}
        keyExtractor={(item: any) => item._id}
        onRefresh={() => {
          setIsLoading(true);
        }}
        refreshing={isLoading}
        renderItem={({ item }: { item: NearbyRestaurant | any }) => (
          <RestaurantEntry {...item} />
        )}
      />
    </StyledView>
  );
};
