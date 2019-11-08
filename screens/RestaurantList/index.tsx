import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';
import { API_URL } from 'react-native-dotenv';
import axios from 'axios';
import styled from 'styled-components/native';

const HeaderTitle = styled.Text`
  font-size: 24px;
  margin: 12px;
`;

const HeaderWrapper = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: black;
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
  const { navigate } = navigation;

  useEffect(() => {
    axios.get(`${API_URL}/restaurants`).then(({ data }) => setList(data));
  }, []);

  return (
    <SafeAreaView>
      <ListHeader />
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <OnClickWrapper navigate={navigate} id={item.id}>
            <RestaurantEntry
              title={item.title}
              description={item.description}
              id={item.id}
            />
          </OnClickWrapper>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
