import { Action, action } from 'easy-peasy';
import { Restaurant } from 'types/restaurant';

export interface RestaurantDetails {
  list: {
    [restaurantId: string]: Restaurant;
  };

  addRestaurant: Action<RestaurantDetails, Restaurant>;
}

export const restaurantDetails: RestaurantDetails = {
  list: {},
  addRestaurant: action((state, restaurant) => {
    state.list[restaurant._id] = restaurant;
  }),
};
