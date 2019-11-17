import {
  StackActions,
  NavigationActions,
  NavigationScreenProp,
} from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import { SESSION_ID_KEY } from 'constants/session';

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

export const logOut = async ({ navigation }: any) => {
  await SecureStore.deleteItemAsync(SESSION_ID_KEY);

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SplashNavigator' })],
  });
  navigation.dispatch(resetAction);
};
