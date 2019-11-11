import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, View } from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import styled from 'styled-components/native';
import { getLocation, getRestaurants } from './utils';
import { Loading } from './Loading';
import { NoRestaurants } from './NoRestaurants';
import { useColorScheme } from 'react-native-appearance';

const HeaderTitle = styled.Text`
  font-size: 24px;
  margin: 12px;
  ${props => (props.theme.colorScheme === 'dark' ? 'color: white;' : '')}
`;

const StyledFlatList = styled(FlatList)`
  height: 100%;
  ${props =>
    props.theme.colorScheme === 'dark' ? 'background-color: black;' : ''}
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
  ${props =>
    props.theme.colorScheme === 'dark' ? 'background-color: black;' : ''}
`;

const ListHeader = ({}) => {
  return (
    <HeaderWrapper>
      <HeaderTitle>Restaurants</HeaderTitle>
    </HeaderWrapper>
  );
};

const OnClickWrapper: React.FC<{ navigate: any; id: number }> = ({
  navigate,
  id,
  children,
}) => {
  return (
    <TouchableOpacity onPress={() => navigate('RestaurantDetails', { id })}>
      {children}
    </TouchableOpacity>
  );
};

const fetchListWithLocation = async () => {
  try {
    const location = await getLocation();

    return getRestaurants({ location });
  } catch (error) {
    console.warn(error);
  }
};

export const RestaurantList: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [list, setList] = useState(null);
  const [shouldFetchList, setShouldFetchList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { navigate } = navigation;

  useEffect(() => {
    if (shouldFetchList) {
      fetchListWithLocation().then(data => {
        setList(data);
        setIsLoading(false);
      });
      setShouldFetchList(false);
    }
  }, [shouldFetchList]);

  if (list === null) {
    return <Loading />;
  }

  if (list.length === 0) {
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
    <SafeAreaView>
      <ListHeader />
      <StyledFlatList
        style={{
          marginBottom: 56,
        }}
        onScrollEndDrag={() => setIsScrolling(false)}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onRefresh={() => {
          setIsLoading(true);
          setShouldFetchList(true);
        }}
        refreshing={isLoading}
        data={list || [{}]}
        extraData={{ isScrolling }}
        renderItem={({ item }: any) => (
          <OnClickWrapper navigate={navigate} id={item.id}>
            <RestaurantEntry
              isScrolling={isScrolling}
              title={item.name}
              description={item.description}
              id={item.id}
              image_url={item.image_url}
              distance={item.distance}
            />
          </OnClickWrapper>
        )}
        keyExtractor={(item: any) => item.id}
      />
    </SafeAreaView>
  );
};
