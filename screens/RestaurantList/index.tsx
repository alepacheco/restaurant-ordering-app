import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import styled, { ThemeContext } from 'styled-components/native';
import { getNearbyRestaurants, getProfile } from 'utils/network';
import { Loading } from '../../components/Loading';
import { NoRestaurants } from './NoRestaurants';
import { useStoreActions, useStoreState } from 'store';
import { NearbyRestaurant } from 'types/restaurant';

const StyledView = styled.View`
  ${props =>
    props.theme.colorScheme === 'dark'
      ? 'background-color: rgb(30,30,30);'
      : ''}
`;
const HeaderTitle = styled.Text`
  font-size: 24px;
  margin: 12px;
  ${props => `color: ${props.theme.textColor};`}
`;

const StyledFlatList = styled(FlatList)`
  margin-bottom: 106px;
  height: 100%;
  ${props => `background-color: ${props.theme.color};`}
`;
const HeaderWrapper = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: gray;
  ${props =>
    props.theme.colorScheme === 'dark'
      ? 'background-color: rgb(30,30,30);'
      : ''}
`;

const Wrapper = styled.View`
  height: 100%;
  ${props => `background-color: ${props.theme.color};`}
`;

const ListHeader = ({}) => {
  return (
    <HeaderWrapper>
      <HeaderTitle>Restaurants</HeaderTitle>
    </HeaderWrapper>
  );
};

export const RestaurantList = ({}) => {
  const nearbyRestaurants = useStoreState(
    state => state.nearbyRestaurants.list
  );
  const setRestaurants = useStoreActions(
    actions => actions.nearbyRestaurants.setRestaurants
  );

  const userData = useStoreState(state => state.user.user);
  const setUser = useStoreActions(actions => actions.user.setUser);

  const [isLoading, setIsLoading] = useState(true);
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (userData === null) {
      getProfile().then(setUser);
    }

    if (isLoading) {
      getNearbyRestaurants().then(restaurants => {
        setRestaurants(restaurants);
        setIsLoading(false);
      });
    }
  }, [isLoading, setRestaurants, setUser, userData]);

  if (nearbyRestaurants === null) {
    return <Loading />;
  }

  if (nearbyRestaurants.length === 0) {
    return (
      <Wrapper>
        <SafeAreaView>
          <ListHeader />
          <NoRestaurants />
        </SafeAreaView>
      </Wrapper>
    );
  }

  return (
    <StyledView>
      <StatusBar barStyle={barStyle} />

      <SafeAreaView style={{ display: 'flex' }}>
        <ListHeader />
        <StyledFlatList
          data={nearbyRestaurants}
          keyExtractor={(item: any) => item._id}
          onRefresh={() => {
            setIsLoading(true);
          }}
          refreshing={isLoading}
          renderItem={({ item }: { item: NearbyRestaurant }) => (
            <RestaurantEntry {...item} />
          )}
        />
      </SafeAreaView>
    </StyledView>
  );
};
