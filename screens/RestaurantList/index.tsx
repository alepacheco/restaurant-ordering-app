import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  View,
} from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import styled, { ThemeContext } from 'styled-components/native';
import { getNearbyRestaurants } from './utils';
import { Loading } from '../../components/Loading';
import { NoRestaurants } from './NoRestaurants';
import { NoConnection } from '../../components/NoConnection';
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

// const onClick = (navigate: any, restaurantId: string) => {
//   navigate('RestaurantDetails', { restaurantId });
// };

export const RestaurantList: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const nearbyRestaurants = useStoreState(
    state => state.nearbyRestaurants.list
  );
  const setRestaurants = useStoreActions(
    actions => actions.nearbyRestaurants.setRestaurants
  );

  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = navigation;
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (isLoading) {
      getNearbyRestaurants().then(restaurants => {
        setRestaurants(restaurants);
        setIsLoading(false);
      });
    }
  }, [isLoading, setRestaurants]);

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
          onRefresh={() => {
            setIsLoading(true);
          }}
          refreshing={isLoading}
          data={nearbyRestaurants}
          renderItem={({ item }: { item: NearbyRestaurant }) => (
            <RestaurantEntry {...item} navigate={navigate} />
          )}
          keyExtractor={(item: any) => item._id}
        />
      </SafeAreaView>
    </StyledView>
  );
};
