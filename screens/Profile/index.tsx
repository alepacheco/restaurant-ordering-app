import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { LogOutButton } from './LogOutButton';

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>This is your profile</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />

      <LogOutButton navigation={navigation} />
    </SafeAreaView>
  );
};
