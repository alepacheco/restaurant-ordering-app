import axios from 'axios';
import { RestaurantMapMarker } from 'types/restaurant';
import { getLocation } from 'utils/location';

export const getRestaurantMarkers = async (): Promise<Array<
  RestaurantMapMarker
>> => {
  const location = await getLocation();
  const { data } = await axios.get(`/restaurants/markers`, {
    params: location,
  });

  return data;
};
