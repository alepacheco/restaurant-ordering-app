import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Settings } from './screens/Settings';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { RestaurantList } from './screens/RestaurantList';
import { Profile } from './screens/Profile';
import { Search } from './screens/Search';
import { RestaurantDetails } from './screens/RestaurantDetails';

const TabBarComponent = props => <BottomTabBar {...props} />;

const BottomTabNavigator = createBottomTabNavigator(
  {
    Restaurants: RestaurantList,
    Search,
    Profile,
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  }
);

const MainNavigator = createStackNavigator({
  BottomTabNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  Settings: { screen: Settings },
  RestaurantDetails,
});

const App = createAppContainer(MainNavigator);

export default App;
