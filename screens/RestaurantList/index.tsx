import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import styled, { ThemeContext } from 'styled-components/native';
import { getLocation, getRestaurants } from './utils';
import { Loading } from '../../components/Loading';
import { NoRestaurants } from './NoRestaurants';
import { NoConnection } from '../../components/NoConnection';

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
  return new Promise(async (resolve, reject) => {
    try {
      const location = await getLocation();

      resolve(getRestaurants({ location }));
    } catch (error) {
      reject(error);
    }
  });
};

export const RestaurantList: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [list, setList] = useState(null);
  const [shouldFetchList, setShouldFetchList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { navigate } = navigation;
  const themeContext = useContext(ThemeContext);
  const barStyle =
    themeContext.colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (shouldFetchList) {
      fetchListWithLocation()
        .then(data => {
          setList(data);
          setIsLoading(false);
        })
        .catch(() => setIsNetworkError(true));
      setShouldFetchList(false);
    }
  }, [shouldFetchList]);

  if (isNetworkError) {
    return <NoConnection />;
  }
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
    <StyledView>
      <StatusBar barStyle={barStyle} />

      <SafeAreaView style={{ display: 'flex' }}>
        <ListHeader />
        <StyledFlatList
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
                imageUrl={item.imageUrl}
                distance={item.distance}
                rating={item.rating}
              />
            </OnClickWrapper>
          )}
          keyExtractor={(item: any) => item.id}
        />
      </SafeAreaView>
    </StyledView>
  );
};
