import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import { getRestaurantMarkers } from 'utils/network';
import { useStoreState, useStoreActions } from 'store';
import { Marker } from './Marker';
import { RestaurantMapMarker } from 'types/restaurant';

const StyledMap = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`;

const markersList = (restaurantMapMarkers: Array<RestaurantMapMarker>) =>
  restaurantMapMarkers.map(marker => <Marker key={marker._id} {...marker} />);

const Map: React.FC<{}> = () => {
  const restaurantMapMarkers = useStoreState(
    state => state.restaurantMapMarkers.list
  );
  const setRestaurantMapMarkers = useStoreActions(
    actions => actions.restaurantMapMarkers.setRestaurantMapMarkers
  );

  useEffect(() => {
    getRestaurantMarkers().then(markers => setRestaurantMapMarkers(markers));
  }, [setRestaurantMapMarkers]);

  return (
    <View>
      <StyledMap
        showsCompass
        showsScale
        maxZoomLevel={17}
        rotateEnabled={false}
        showsUserLocation>
        {restaurantMapMarkers && restaurantMapMarkers.length > 0 ? (
          markersList(restaurantMapMarkers)
        ) : (
          <View />
        )}
      </StyledMap>
    </View>
  );
};

export default withNavigation(Map);
