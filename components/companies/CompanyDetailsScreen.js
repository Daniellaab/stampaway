import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../AuthenticationService';

const CompanyDetailsScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { companyId, companyName } = route.params;

  const handleViewCoupons = () => {
    // Navigate to the CouponsScreen for the selected company
    navigation.navigate('Coupons', { companyId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.companyName}>{companyName}</Text>
      <TouchableOpacity style={styles.button} onPress={handleViewCoupons}>
        <Text style={styles.buttonText}>View Coupons</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: '60%', // Adjust the width as needed
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompanyDetailsScreen;
