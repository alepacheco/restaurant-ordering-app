import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { LogOutButton } from './LogOutButton';
import { getProfile } from './utils';

export const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const userId = 1;

  useEffect(() => {
    if (userData === null) {
      getProfile({ userId }).then(setUserData);
    }
  }, []);
  return (
    <SafeAreaView>
      <Text>This is your profile</Text>
      <Text>{JSON.stringify(userData)}</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />

      <LogOutButton navigation={navigation} />
    </SafeAreaView>
  );
};
