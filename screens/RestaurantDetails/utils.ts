import axios from 'axios';
import { API_URL } from '../../constants/network';

interface GetRestaurantsArgs {
  restaurantId: number;
}

export const getRestaurantDetails = async ({
  restaurantId,
}: GetRestaurantsArgs) => {
  const { data } = await axios.get(`${API_URL}/restaurant`, {
    params: {
      id: restaurantId,
    },
  });

  return data;
};
