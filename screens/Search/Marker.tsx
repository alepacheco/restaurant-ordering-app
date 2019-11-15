import React from 'react';
import MapView, { Marker as ReactMarker } from 'react-native-maps';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { RestaurantMapMarker } from 'types/restaurant';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

const Emoji = styled.Text`
  font-size: 34px;
`;

export const Marker = withNavigation(
  ({
    _id,
    navigation,
    latitude,
    longitude,
    emoji,
  }: RestaurantMapMarker & NavigationInjectedProps) => {
    return (
      <ReactMarker
        onPress={() =>
          navigation.navigate('RestaurantDetails', { restaurantId: _id })
        }
        coordinate={{ latitude, longitude }}>
        <View>
          <Emoji>{emoji}</Emoji>
        </View>
      </ReactMarker>
    );
  }
);
