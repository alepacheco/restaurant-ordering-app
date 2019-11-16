import { StackActions, NavigationActions } from 'react-navigation';

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
