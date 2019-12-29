import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import { getRestaurantMarkers } from 'utils/network';
import { useStoreState, useStoreActions } from 'store';
import { Marker } from './Marker';
import { RestaurantMapMarker } from 'types/restaurant';
import { getLocation } from 'utils/location';

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

  const userLocation = useStoreState(state => state.user.user.location);
  const setLocation = useStoreActions(actions => actions.user.setLocation);

  useEffect(() => {
    if (userLocation) {
      getRestaurantMarkers(userLocation).then(markers =>
        setRestaurantMapMarkers(markers)
      );
    } else {
      getLocation().then(setLocation);
    }
  }, [setLocation, setRestaurantMapMarkers, userLocation]);

  return (
    <StyledMap
      showsCompass
      showsScale
      region={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        ...userLocation,
      }}
      maxZoomLevel={17}
      rotateEnabled={false}
      showsUserLocation>
      {restaurantMapMarkers && restaurantMapMarkers.length > 0 ? (
        markersList(restaurantMapMarkers)
      ) : (
        <View />
      )}
    </StyledMap>
  );
};

export default withNavigation(Map);
