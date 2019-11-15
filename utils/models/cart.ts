import { Action, action } from 'easy-peasy';

interface Selection {
  amount: number;
  itemId: string;
  options: [];
}

export interface Cart {
  // A different card for each restaurant
  items: {
    [restaurantId: string]: Array<Selection>;
  };
  selectedRestaurantId: string;
  add: Action<Cart, { restaurantId: string; items: Selection }>;
  setRestaurant: Action<Cart, string>;
}

export const cart: Cart = {
  items: {},
  selectedRestaurantId: null,
  add: action((state, { restaurantId, items }) => {
    state.items[restaurantId].push(items);
  }),
  setRestaurant: action((state, payload) => {
    state.selectedRestaurantId = payload;
  }),
};
