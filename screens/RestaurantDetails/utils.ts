import axios from 'axios';
import { API_URL } from '../../constants/network';

interface getRestaurantsArgs {
  restaurantId: number;
}

export const getRestaurantDetails = async ({
  restaurantId,
}: getRestaurantsArgs) => {
  const { data } = await axios.get(`${API_URL}/restaurants/details`, {
    params: {
      restaurantId,
    },
  });

  return data;
};
