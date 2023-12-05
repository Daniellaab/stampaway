import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../AuthenticationService'; 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useAuth(); // Use the correct function name
  const navigation = useNavigation(); // Get navigation object from the hook

  const handleRegister = async () => {
    try {
      await registerUser(email, password); // Use the correct function name
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('NextScreen'); // Navigate to NextScreen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
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

export default RegistrationScreen;
