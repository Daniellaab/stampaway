// Herinde findes koden til at registrere en bruger i databasen.

import { useNavigation } from '@react-navigation/native'; 
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { useAuth } from '../../AuthenticationService';

// Komponent til registrering af brugere
const RegistrationScreen = () => {
  // State-hooks til at håndtere email og password inputfelter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hent registerUser funktion fra autentificeringskonteksten
  const { registerUser } = useAuth(); 

  // Hent navigation fra React Navigation biblioteket
  const navigation = useNavigation(); 

  // Funktion til håndtering af registrering af bruger
  const handleRegister = async () => {
    try {
      // Kald registerUser funktionen med email og password
      await registerUser(email, password); 
      
      // Vis en succesmeddelelse og naviger til hjemmeskærmen ved vellykket registrering
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Home'); 
    } catch (error) {
      // Håndter fejl og vis en fejlmeddelelse ved mislykket registrering
      Alert.alert('Error', error.message);
    }
  };

  return (
    // Visningslag med tekstinputfelter til email og password samt en registreringsknap
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

// Eksporter RegistrationScreen komponenten som standard eksport
export default RegistrationScreen;