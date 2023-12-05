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
          <Text>Velkommen, {user.email}!</Text>
          <Button title="Log ud" onPress={signOutUser} />
        </View>
      ) : (
        <View>
          <Text>Opret en profil eller log ind!</Text>
          <Button title="Opret profil" onPress={() => navigation.navigate('Register')} />
          <Button title="Log ind" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

