import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

export class Profile extends React.Component<{ navigation: any }> {
  render() {
    return (
      <SafeAreaView>
        <Text>This is your profile</Text>
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </SafeAreaView>
    );
  }
}
