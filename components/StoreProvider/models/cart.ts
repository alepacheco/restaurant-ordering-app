import { Action, action } from 'easy-peasy';

interface Selection {
  amount: number;
  itemId: string;
  options: [];
}

export interface Cart {
  items: {
    [restaurantId: string]: Array<Selection>;
  };
  add: Action<Cart, { restaurantId: string; items: Selection }>;
}

const cart: Cart = {
  items: {},
  add: action((state, { restaurantId, items }) => {
    state.items[restaurantId].push(items);
  }),
};

export default cart;
