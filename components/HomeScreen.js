import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthenticationService'; // Make sure to import the correct path for your AuthenticationService

const HomeScreen = ({ navigation }) => {
  const { user, signOutUser } = useAuth();

  const menuItems = [
    { title: 'Opret virksomhed', screen: 'CreateCompany' },
    { title: 'Alle virksomheder', screen: 'AllCompanies' },
    { title: 'Kamera', screen: 'Camera' },
    { title: 'Kort', screen: 'Map' },
  ];

  return (
    <View style={styles.container}>
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