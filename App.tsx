import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Settings } from './screens/Settings';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import React from 'react';
import { RestaurantList } from './screens/RestaurantList';
import { Profile } from './screens/Profile';
import { Search } from './screens/Search';
import { createStackNavigator } from 'react-navigation-stack';

const TabBarComponent = props => <BottomTabBar {...props} />;

const BottomTabNavigator = createBottomTabNavigator(
  {
    RestaurantList,
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
});

const App = createAppContainer(MainNavigator);

export default App;
