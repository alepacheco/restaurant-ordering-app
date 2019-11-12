import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { API_URL } from '../../constants/network';

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

interface GetRestaurantsArgs {
  location?: {
    latitude?: number;
    longitude?: number;
  };
}

export const getRestaurants = async ({ location }: GetRestaurantsArgs) => {
  let params = {};

  if (location) {
    const { longitude, latitude } = location;

    params = {
      longitude,
      latitude,
    };
  }

  const { data } = await axios.get(`${API_URL}/restaurants`, {
    params,
  });

  return data;
};
