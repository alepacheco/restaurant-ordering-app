import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  SESSION_ID_KEY,
  USER_EMAIL,
  USER_PASSWORD,
} from '../../constants/session';
import { NavigationScreenProp } from 'react-navigation';

export const goToHome = (navigation: NavigationScreenProp<{}>) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
  navigation.dispatch(resetAction);
};

export const resetNavigation = (navigation: NavigationScreenProp<{}>) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SplashNavigator' })],
  });
  navigation.dispatch(resetAction);
};

export const signUp = async ({
  username,
  password,
  name,
}: {
  username: string;
  password: string;
  name: string;
}) => {
  const { data } = await axios.post(`/signup`, {
    name,
    password,
    email: username,
  });
  await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId);
};

export const loginNow = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const {
    data: { sessionId },
  } = await axios.post(`/login`, {
    username,
    password,
  });

  await SecureStore.setItemAsync(SESSION_ID_KEY, sessionId);
  await SecureStore.setItemAsync(USER_EMAIL, username);
  await SecureStore.setItemAsync(USER_PASSWORD, password);
};
