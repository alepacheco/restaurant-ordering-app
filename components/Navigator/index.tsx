import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Settings } from '../../screens/Settings';
import { createStackNavigator } from 'react-navigation-stack';
import { RestaurantList } from '../../screens/RestaurantList';
import { Profile } from '../../screens/Profile';
import { Search } from '../../screens/Search';
import { RestaurantDetails } from '../../screens/RestaurantDetails';
import { LogIn } from '../../screens/LogIn';
import { SignUp } from '../../screens/SignUp';
import { Splash } from '../../screens/Splash';
import { ProductDetails } from '../../screens/ProductDetails';
import { TabBarIcon } from '../TabBar/TabBarIcon';
import { TabBar } from '../TabBar';
import { createAppContainer } from 'react-navigation';

const HomeTabIcon = (props: any) => (
  <TabBarIcon icon="home" focused={props.focused} />
);

const MapTabIcon = (props: any) => (
  <TabBarIcon icon="map" focused={props.focused} />
);

const ProfileTabIcon = (props: any) => (
  <TabBarIcon icon="profile" focused={props.focused} />
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Restaurants: {
      screen: RestaurantList,
      navigationOptions: {
        title: '',
        tabBarIcon: HomeTabIcon,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        title: '',
        tabBarIcon: MapTabIcon,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: '',
        tabBarIcon: ProfileTabIcon,
      },
    },
  },
  {
    tabBarComponent: TabBar,
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

export const Navigator = createStackNavigator(
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

export const Router = createAppContainer(Navigator);