import axios from 'axios';
import { Restaurant } from 'types/restaurant';
import { NearbyRestaurant } from 'types/restaurant';
import { getLocation } from 'utils/location';
import { RestaurantMapMarker } from 'types/restaurant';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { SESSION_ID_KEY, USER_EMAIL, USER_PASSWORD } from 'constants/session';

interface GetRestaurantsArgs {
  restaurantId: string;
}

export const getRestaurantDetails = async ({
  restaurantId,
}: GetRestaurantsArgs) => {
  try {
    const { data } = await axios.get(`/restaurant`, {
      params: {
        id: restaurantId,
      },
    });

    return data as Restaurant;
  } catch (error) {
    throw new Error('Failure at getRestaurantDetails');
  }
};

export const setSessionInAxios = async () => {
  const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);
  axios.defaults.headers.common['authorization'] = sessionId;
};

export const getNearbyRestaurants = async () => {
  try {
    const params = await getLocation();

    const { data } = await axios.get(`/restaurants`, {
      params,
    });

    return data as Array<NearbyRestaurant>;
  } catch (error) {
    throw new Error('Failure at getNearbyRestaurants');
  }
};

export const getRestaurantMarkers = async (): Promise<Array<
  RestaurantMapMarker
>> => {
  const location = await getLocation();
  const { data } = await axios.get(`/restaurants/markers`, {
    params: location,
  });

  return data;
};

export const signUp = async ({
  username,
  password,
  name,
}: {
  username: string;
  password: string;
  name: string;
}) => {
  const { data } = await axios.post(`/signup`, {
    name,
    password,
    email: username,
  });
  await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId);
  setSessionInAxios();
};

export const loginNow = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const {
    data: { sessionId },
  } = await axios.post(`/login`, {
    username,
    password,
  });

  await SecureStore.setItemAsync(SESSION_ID_KEY, sessionId);
  await SecureStore.setItemAsync(USER_EMAIL, username);
  await SecureStore.setItemAsync(USER_PASSWORD, password);

  setSessionInAxios();
};

export const getProfile = async () => {
  try {
    const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);

    const { data } = await axios.get(`/user`);

    return data;
  } catch (error) {
    throw new Error('Failure at getProfile');
  }
};

export const uploadFile = async (uri: string) => {
  const base64Image = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);

  return axios.post(`/user/image`, {
    file: base64Image,
    sessionId,
  });
};