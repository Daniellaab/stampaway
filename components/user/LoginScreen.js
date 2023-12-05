import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../AuthenticationService'; // Make sure to use the correct path
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInUser } = useAuth();
  const navigation = useNavigation(); // Get navigation object from the hook

  const handleLogin = async () => {
    try {
      await signInUser(email, password);
      Alert.alert('Success', 'User logged in successfully!');
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
