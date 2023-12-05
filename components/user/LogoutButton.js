// LogoutButton.js
import React from 'react';
import { Button, Alert } from 'react-native';
import AuthenticationService from '../../AuthenticationService';

const LogoutButton = () => {
  const handleLogout = async () => {
    const result = await AuthenticationService.signOut();
    if (!result.success) {
      Alert.alert('Error', result.error);
    }
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
