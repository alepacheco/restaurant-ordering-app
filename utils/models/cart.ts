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
  add: Action<Cart, { restaurantId: string; selection: Selection }>;
}

export const cart: Cart = {
  items: {},
  add: action((state, { restaurantId, selection }) => {
    const itemsForRestaurant = state.items[restaurantId];

    if (!itemsForRestaurant) {
      state.items[restaurantId] = [selection];
      return state;
    }

    const identicalMatchComparator = (sel: Selection) =>
      sel.itemId === selection.itemId &&
      JSON.stringify(sel.options) === JSON.stringify(selection.options);

    if (itemsForRestaurant.find(identicalMatchComparator)) {
      state.items[restaurantId] = itemsForRestaurant.map(sel => {
        if (identicalMatchComparator(sel)) {
          return {
            ...sel,
            amount: sel.amount + selection.amount,
          };
        }

        return sel;
      });
    } else {
      state.items[restaurantId] = [...itemsForRestaurant, selection];
    }

    return state;
  }),
};
