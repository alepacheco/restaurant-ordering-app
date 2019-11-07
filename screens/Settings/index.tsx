import React from 'react';
import { Text } from 'react-native';

export class Settings extends React.Component<{}> {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return <Text>Settings</Text>;
  }
}
