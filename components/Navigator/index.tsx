import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Settings } from '../../screens/Settings';
import { createStackNavigator } from 'react-navigation-stack';
import { RestaurantList } from '../../screens/RestaurantList';
import { Profile } from '../../screens/Profile';
import { Search } from '../../screens/Search';
import { RestaurantDetails } from '../../screens/RestaurantDetails';
import { LogIn } from '../../screens/Splash/LogIn';
import { SignUp } from '../../screens/Splash/SignUp';
import { Splash } from '../../screens/Splash';
import { Cart } from '../../screens/Cart';
import { Orders } from '../../screens/Orders';
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
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: 'Splash' }
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

    RestaurantDetails: {
      screen: RestaurantDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        headerShown: false,
      },
    },
    Orders: {
      screen: Orders,
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
