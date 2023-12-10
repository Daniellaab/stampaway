import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import addCompanyToDatabase from './addCompanyToDatabase'; // Import the function directly

const AddCompanyScreen = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState(''); // Add state for company description
  const [companyCategory, setCompanyCategory] = useState(''); // Add state for company category

  const handleAddCompany = async () => {
    if (!companyName.trim() || !companyDescription.trim() || !companyCategory.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      // Assuming you have a function in addCompanyToDatabase for adding a company
      await addCompanyToDatabase(companyName, companyDescription, companyCategory);
      Alert.alert('Success', 'Company added successfully!');
      setCompanyName('');
      setCompanyDescription('');
      setCompanyCategory('');
    } catch (error) {
      console.error('Error adding company:', error);
      Alert.alert('Failed to add company');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company Description"
        value={companyDescription}
        onChangeText={setCompanyDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Company Category"
        value={companyCategory}
        onChangeText={setCompanyCategory}
      />
      <Button title="Add Company" onPress={handleAddCompany} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddCompanyScreen;
