// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../AuthenticationService';

const HomeScreen = ({ navigation }) => {
  const { user, signOutUser } = useAuth();

  return (
    <View>
      {user ? (
        <View>
          <Text>Welcome, {user.email}!</Text>
          <Button title="Sign Out" onPress={signOutUser} />
        </View>
      ) : (
        <View>
          <Text>You are not signed in.</Text>
          <Button title="Sign In" onPress={() => navigation.navigate('Register')} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

