// Import necessary components from React and React Native packages
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, remove } from 'firebase/database';

// Functional component for displaying and editing company information
function CompanyDetails({ route, navigation }) {
  // State to hold information about the selected company
  const [company] = useState(route.params.company[1]);

  // Function to confirm deletion of the company
  const confirmDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Show a confirmation dialog to the user
      Alert.alert('Are you sure?', 'Do you want to delete the company?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ]);
    }
  };

  // Function to handle the deletion of the company
  const handleDelete = async () => {
    const id = route.params.company[0];
    const db = getDatabase();
    const companyRef = ref(db, `Companies/${id}`);

    try {
      // Delete the company from the database
      await remove(companyRef);
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      // Show an error message if the deletion fails
      Alert.alert(error.message);
    }
  };

  // If there is no company information, display a message
  if (!company) {
    return <Text>No data</Text>;
  }

  // Render company information with the option for deletion
  return (
    <View style={styles.container}>
      {/* Display company information in a details-container */}
      <View style={styles.detailsContainer}>
        {Object.entries(company).map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]}</Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        ))}
      </View>
      {/* Buttons for editing and deleting the company */}
      <View style={styles.buttonsContainer}>
        {/* Button for deleting the company */}
        <TouchableOpacity style={styles.button} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        {/* Button for navigating to StampCardScreen */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('StampCard', { companyId: route.params.company[0], companyName: route.params.company[1].name })}
        >
          <Text style={styles.buttonText}>Stamp Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: '48%', // Adjust the width as needed
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompanyDetails;
