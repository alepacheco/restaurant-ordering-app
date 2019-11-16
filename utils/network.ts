import axios from 'axios';
import { Restaurant } from 'types/restaurant';

interface GetRestaurantsArgs {
  restaurantId: string;
}

export const getRestaurantDetails = async ({
  restaurantId,
}: GetRestaurantsArgs) => {
  const { data } = await axios.get(`/restaurant`, {
    params: {
      id: restaurantId,
    },
  });

  return data as Restaurant;
};
