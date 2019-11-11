import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Settings } from './screens/Settings';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { RestaurantList } from './screens/RestaurantList';
import { Profile } from './screens/Profile';
import { Search } from './screens/Search';
import { RestaurantDetails } from './screens/RestaurantDetails';
import { LogIn } from './screens/LogIn';
import { SignUp } from './screens/SignUp';
import { Splash } from './screens/Splash';
import { ProductDetails } from './screens/ProductDetails';
import { TabBarIcon } from './components/TabBarIcon';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import styled, { ThemeProvider } from 'styled-components/native';

const TabBarComponent = (props: any) => <BottomTabBar {...props} />;

const StyledTabBarComponent = styled(TabBarComponent)`
  ${props =>
    props.theme.colorScheme === 'dark'
      ? 'background-color: rgb(30,30,30);'
      : ''}
`;

const BottomTabNavigator = createBottomTabNavigator(
  {
    Restaurants: {
      screen: RestaurantList,
      navigationOptions: {
        title: '',
        tabBarIcon: (props: any) => (
          <TabBarIcon emoji="🏘" focused={props.focused} />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        title: '',
        tabBarIcon: (props: any) => (
          <TabBarIcon emoji="🗺" focused={props.focused} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: '',
        tabBarIcon: (props: any) => (
          <TabBarIcon emoji="🐶" focused={props.focused} />
        ),
      },
    },
  },
  {
    tabBarComponent: (props: any) => (
      <StyledTabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  }
);

const SplashNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        headerShown: true,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: true,
      },
    },
  },
  { initialRouteName: 'Splash', mode: 'modal' }
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    Settings,
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    SplashNavigator: {
      screen: SplashNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: 'SplashNavigator' }
);

const App = createAppContainer(MainNavigator);

export default () => (
  <AppearanceProvider>
    <ThemeProvider
      theme={{
        colorScheme: useColorScheme(),
      }}>
      <App />
    </ThemeProvider>
  </AppearanceProvider>
);
