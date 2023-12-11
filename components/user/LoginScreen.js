// Her findes screen til at logge en bruger ind.

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { useAuth } from '../../AuthenticationService'; // Make sure to use the correct path

// Komponent til login
const LoginScreen = () => {
  // State-hooks til at håndtere email og password inputfelter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hent signInUser funktion fra autentificeringskonteksten
  const { signInUser } = useAuth();
  
  // Hent navigation fra React Navigation biblioteket
  const navigation = useNavigation();

  // Funktion til håndtering af login
  const handleLogin = async () => {
    try {
      // Kald signInUser funktionen med email og password
      await signInUser(email, password);
      
      // Vis en succesmeddelelse og naviger til hjemmeskærmen ved vellykket login
      Alert.alert('Success', 'User logged in successfully!');
      navigation.navigate('Home'); 
    } catch (error) {
      // Håndter fejl og vis en fejlmeddelelse ved mislykket login
      Alert.alert('Error', error.message);
    }
  };

  return (
    // Visningslag med tekstinputfelter til email og password samt en login-knap
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// Eksporter LoginScreen komponenten som standard eksport
export default LoginScreen;