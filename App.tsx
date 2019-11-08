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
import { ProductDetails } from './screens/ProductDetails';

const TabBarComponent = (props: any) => <BottomTabBar {...props} />;

const BottomTabNavigator = createBottomTabNavigator(
  {
    Restaurants: RestaurantList,
    Search,
    Profile,
  },
  {
    tabBarComponent: (props: any) => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  }
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
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: 'LogIn' }
);

const App = createAppContainer(MainNavigator);

export default App;
