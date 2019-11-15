import { Action, action } from 'easy-peasy';

interface UserData {
  name?: string;
  email?: string;
  bio?: string;
  imageUrl?: string;
}

export interface User {
  user: UserData;
  setUser: Action<User, UserData>;
}

export const user: User = {
  user: null,
  setUser: action((state, userData) => {
    state.user = userData;
  }),
};
