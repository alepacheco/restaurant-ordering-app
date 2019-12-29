import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Settings } from 'screens/Settings';
import { createStackNavigator } from 'react-navigation-stack';
import { RestaurantList } from 'screens/RestaurantList';
import { Profile } from 'screens/Profile';
import { Search } from 'screens/Search';
import { RestaurantDetails } from 'screens/Restaurant/RestaurantDetails';
import { LogIn } from 'screens/LoginFlow/LogIn';
import { SignUp } from 'screens/LoginFlow/SignUp';
import { Cart } from 'screens/Restaurant/Cart';
import { Orders } from 'screens/Orders';
import { ProductDetails } from 'screens/Restaurant/ProductDetails';
import { TabBarIcon } from '../TabBar/TabBarIcon';
import { TabBar } from '../TabBar';
import { createAppContainer } from 'react-navigation';
import { PaymentDetails } from 'screens/PaymentDetails';
import { AddNewCard } from 'screens/AddNewCard';

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
  { initialRouteName: 'LogIn' }
);

const PaymentOptionsNavigator = createStackNavigator(
  {
    PaymentDetails: {
      screen: PaymentDetails,
      navigationOptions: {
        headerShown: false,
      },
    },

    AddNewCard: {
      screen: AddNewCard,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: 'PaymentDetails' }
);

export const Navigator = createStackNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerShown: false,
      },
    },
    PaymentDetails: {
      screen: PaymentOptionsNavigator,
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
