import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export const RestaurantDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { id } = navigation.state.params;

  return (
    <SafeAreaView>
      <Text>Details for restaurant</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  );
};
