import React from 'react';
import { Button, View } from 'react-native';

export class Home extends React.Component<{ navigation: any }> {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props);
    return (
      <View>
        <Button title="Go Settings" onPress={() => navigate('Settings')} />
      </View>
    );
  }
}
