import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { getLocation } from '../RestaurantList/utils';
import { withNavigation } from 'react-navigation';
import { getRestaurantMarkers } from './utils';

const MarkerStyle = styled.View``;

const Emoji = styled.Text`
  font-size: 34px;
`;

const StyledMap = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`;

interface RestaurantMarker {
  emoji: string;
  longitude: number;
  latitude: number;
  id: string;
}

const CustomMarker = ({
  id,
  navigation,
  latitude,
  longitude,
  emoji,
}: RestaurantMarker & { navigation: any }) => {
  return (
    <Marker
      onPress={() => navigation.navigate('RestaurantDetails', { id })}
      coordinate={{ latitude, longitude }}>
      <MarkerStyle>
        <Emoji>{emoji}</Emoji>
      </MarkerStyle>
    </Marker>
  );
};

const Map: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [initialRegion, setInitialLRegion] = useState(undefined);
  const [markers, setMarkers] = useState([] as Array<RestaurantMarker>);

  useEffect(() => {
    getLocation().then(location => {
      setInitialLRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      getRestaurantMarkers({ location }).then(markers => setMarkers(markers));
    });
  }, []);

  const markersList = markers.map(marker => (
    <CustomMarker
      id={marker.id}
      key={marker.id}
      latitude={marker.latitude}
      longitude={marker.longitude}
      emoji={marker.emoji}
      navigation={navigation}
    />
  ));

  return (
    <View>
      <StyledMap
        showsCompass
        showsScale
        maxZoomLevel={17}
        rotateEnabled={false}
        showsUserLocation
        region={initialRegion}>
        {markersList.length > 0 ? markersList : <View />}
      </StyledMap>
    </View>
  );
};

export default withNavigation(Map);
