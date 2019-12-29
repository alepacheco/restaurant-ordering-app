import { Action, action } from 'easy-peasy';
import { UserOrder } from 'types/userOrder';

interface PaymentMethod {
  card: {
    brand: string;
    exp_month: string;
    exp_year: string;
    fingerprint: string;
    last4: string;
  };
  id: string;
  livemode: boolean;
}

interface UserData {
  name?: string;
  email?: string;
  bio?: string;
  imageUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  paymentMethods?: Array<PaymentMethod>;
  orders?: Array<UserOrder>;
}

export interface User {
  user: UserData;
  setUser: Action<User, UserData>;
  setLocation: Action<
    User,
    {
      longitude: number;
      latitude: number;
    }
  >;
  setPaymentMethods: Action<User, Array<PaymentMethod>>;
  setOrders: Action<User, Array<UserOrder>>;
}

export const user: User = {
  user: {},
  setUser: action((state, userData) => {
    state.user = userData;
  }),
  setLocation: action((state, location) => {
    state.user.location = location;
  }),
  setPaymentMethods: action((state, paymentMethods) => {
    state.user.paymentMethods = paymentMethods;
  }),
  setOrders: action((state, orders) => {
    state.user.orders = orders;
  }),
};
