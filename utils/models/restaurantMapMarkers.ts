import { Action, action } from 'easy-peasy';
import { RestaurantMapMarker } from 'types/restaurant';

export interface RestaurantMapMarkers {
  list: Array<RestaurantMapMarker>;
  setRestaurantMapMarkers: Action<
    RestaurantMapMarkers,
    Array<RestaurantMapMarker>
  >;
}

export const restaurantMapMarkers: RestaurantMapMarkers = {
  list: null,
  setRestaurantMapMarkers: action((state, payload) => {
    state.list = payload;
  }),
};
