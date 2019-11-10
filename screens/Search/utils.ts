import axios from 'axios';
import { API_URL } from '../../constants/network';

interface RestaurantMarker {
  emoji: string;
  longitude: number;
  latitude: number;
  id: string;
}

export const getRestaurantMarkers = async ({
  location,
}: {
  location: { longitude: number; latitude: number };
}): Promise<Array<RestaurantMarker>> => {
  const { data } = await axios.get(`${API_URL}/restaurants/markers`, {
    params: location,
  });

  return data;
};
