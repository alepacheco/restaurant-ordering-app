import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import styled from 'styled-components/native';
import { getLocation, getRestaurants } from './utils';

const HeaderTitle = styled.Text`
  font-size: 24px;
  margin: 12px;
`;

const HeaderWrapper = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: black;
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SeparatorWrapper = styled.View`
  display: flex;
  margin: 0 12px;
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

export const RestaurantList: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = navigation;

  useEffect(() => {
    if (isLoading) {
      (async () => {
        try {
          const location = await getLocation();

          await getRestaurants({ setList, setIsLoading, location });
        } catch (error) {}

        setIsLoading(false);
      })();
    }
  }, [isLoading]);

  return (
    <SafeAreaView>
      <ListHeader />
      <FlatList
        onRefresh={() => setIsLoading(true)}
        refreshing={isLoading}
        data={list}
        renderItem={({ item }) => (
          <OnClickWrapper navigate={navigate} id={item.id}>
            <RestaurantEntry
              title={item.title}
              description={item.description}
              id={item.id}
              distance={item.distance}
            />
          </OnClickWrapper>
        )}
        ItemSeparatorComponent={() => (
          <SeparatorWrapper>
            <Separator />
          </SeparatorWrapper>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
