// Denne startside kan kun ses hvis man har en profil på applikationen og er logget ind, men her vil man kunne trykke sig videre til de andre screens.

import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../AuthenticationService'; 

// HomeScreen komponent
const HomeScreen = ({ navigation }) => {
  // Hent bruger og signOutUser funktion fra autentificeringskonteksten
  const { user, signOutUser } = useAuth();

  // Menu punkter med tilhørende skærme
  const menuItems = [
    { title: 'Opret virksomhed', screen: 'CreateCompany' },
    { title: 'Alle virksomheder', screen: 'AllCompanies' },
    { title: 'Kamera', screen: 'Camera' },
    { title: 'Kort', screen: 'Map' },
  ];

  return (
    <View style={styles.container}>
      {/* Vis brugerinformation og log ud knap, hvis brugeren er logget ind */}
      {user ? (
        <View>
          <Text>Velkommen, {user.email}!</Text>
          <Button title="Log ud" onPress={signOutUser} />
        </View>
      ) : (
        // Vis autentificeringsmuligheder, hvis brugeren ikke er logget ind
        <View>
          <Text>Opret en profil eller log ind!</Text>
          <Button title="Opret profil" onPress={() => navigation.navigate('Register')} />
          <Button title="Log ind" onPress={() => navigation.navigate('Login')} />
        </View>
      )}

      {/* Vis menu punkter som knapper, hvis brugeren er logget ind */}
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

// Stilarter for HomeScreen komponenten
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

// Eksporter HomeScreen komponenten som standard eksport
export default HomeScreen;