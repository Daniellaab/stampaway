import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthenticationService'; // Make sure to import the correct path for your AuthenticationService

const HomeScreen = ({ navigation }) => {
  const { user, signOutUser } = useAuth();

  const menuItems = [
    { title: 'Create Company', screen: 'CreateCompany' },
    { title: 'All Companies', screen: 'AllCompanies' },
    { title: 'Camera', screen: 'Camera' },
    { title: 'Map', screen: 'Map' },
  ];

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome, {user.email}!</Text>
          <Button title="Log out" onPress={signOutUser} />
        </View>
      ) : (
        <View>
          <Text>Create a profile or log in!</Text>
          <Button title="Create Profile" onPress={() => navigation.navigate('Register')} />
          <Button title="Log in" onPress={() => navigation.navigate('Login')} />
        </View>
      )}

      {/* Menu Items - Only display if the user is logged in */}
      {user && menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;