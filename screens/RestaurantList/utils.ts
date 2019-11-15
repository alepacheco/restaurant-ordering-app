import axios from 'axios';
import { NearbyRestaurant } from 'types/restaurant';
import { getLocation } from 'utils/location';

export const getNearbyRestaurants = async () => {
  const params = await getLocation();

  const { data } = await axios.get(`/restaurants`, {
    params,
  });

  return data as Array<NearbyRestaurant>;
};
