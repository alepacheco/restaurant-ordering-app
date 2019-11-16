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
  add: Action<Cart, { restaurantId: string; items: Selection }>;
}

export const cart: Cart = {
  items: {},
  add: action((state, { restaurantId, items }) => {
    // TODO squash by product id
    state.items[restaurantId] = [...(state.items[restaurantId] || []), items];
  }),
};
