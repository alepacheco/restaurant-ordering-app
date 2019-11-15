import axios from 'axios';

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
  const { data } = await axios.get(`/restaurants/markers`, {
    params: location,
  });

  return data;
};
