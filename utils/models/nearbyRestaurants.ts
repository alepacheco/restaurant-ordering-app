import { Action, action } from 'easy-peasy';
import { NearbyRestaurant } from 'types/restaurant';

export interface NearbyRestaurants {
  list: Array<NearbyRestaurant>;
  setRestaurants: Action<NearbyRestaurants, Array<NearbyRestaurant>>;
}

export const nearbyRestaurants: NearbyRestaurants = {
  list: null,
  setRestaurants: action((state, payload) => {
    state.list = payload;
  }),
};

export default nearbyRestaurants;
