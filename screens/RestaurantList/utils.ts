import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { NearbyRestaurant } from 'types/restaurant';

export const getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const location = await Location.getCurrentPositionAsync({});

  return {
    longitude: location.coords.longitude,
    latitude: location.coords.latitude,
  };
};

export const getNearbyRestaurants = async () => {
  const params = await getLocation();

  const { data } = await axios.get(`/restaurants`, {
    params,
  });

  return data as Array<NearbyRestaurant>;
};
