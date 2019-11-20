import { Action, action } from 'easy-peasy';

interface UserData {
  name?: string;
  email?: string;
  bio?: string;
  imageUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
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
}

export const user: User = {
  user: {},
  setUser: action((state, userData) => {
    state.user = userData;
  }),
  setLocation: action((state, location) => {
    state.user.location = location;
  }),
};
