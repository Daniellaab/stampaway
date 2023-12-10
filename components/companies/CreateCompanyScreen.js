// CreateCompanyScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { getDatabase, ref, push, child, set } from 'firebase/database';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../globalStyles/GlobalStyles';

const CreateCompanyScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [stamps, setStamps] = useState(5);
  const [stampCardName, setStampCardName] = useState('');

  const handleAddCompany = async () => {
    try {
      const database = getDatabase();
      const companiesRef = ref(database, 'Companies');

      if (!companyName.trim() || !companyDescription.trim() || !stampCardName.trim()) {
        Alert.alert('Error', 'All fields are required');
        return;
      }

      const newCompanyData = {
        name: companyName,
        description: companyDescription,
        stamps: stamps,
        stampCardName: stampCardName,
      };

      const newCompanyRef = push(companiesRef);
      const companyId = newCompanyRef.key;

      await set(child(companiesRef, companyId), newCompanyData);

      Alert.alert('Success', `Company added successfully with ID: ${companyId}`);
      setCompanyName('');
      setCompanyDescription('');
      setStampCardName('');
    } catch (error) {
      console.error('Error adding company:', error);
      Alert.alert('Failed to add company');
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Company Description"
        value={companyDescription}
        onChangeText={setCompanyDescription}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Stamp Card Name"
        value={stampCardName}
        onChangeText={setStampCardName}
      />
      <Button title="Add Company" onPress={handleAddCompany} />
      <Text style={globalStyles.pickerTitle}>Choose Stamp Card Options:</Text>
      <Picker
        selectedValue={stamps}
        onValueChange={(itemValue, itemIndex) => setStamps(itemValue)}
        style={globalStyles.picker}
        itemStyle={{ justifyContent: 'flex-start' }} // Align text to the left
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <Picker.Item key={value} label={`${value} Stamps`} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export default CreateCompanyScreen;