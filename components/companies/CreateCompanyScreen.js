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
      <Text style={globalStyles.title}>Opret en virksomhed med et tilhørende stempelkort:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Virksomhedsnavn"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Beskrivelse"
        value={companyDescription}
        onChangeText={setCompanyDescription}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Navn på stempelkort"
        value={stampCardName}
        onChangeText={setStampCardName}
      />
      <Text style={globalStyles.pickerTitle}>Vælg antal stempler:</Text>
      <Picker
        selectedValue={stamps}
        onValueChange={(itemValue, itemIndex) => setStamps(itemValue)}
        style={globalStyles.picker}
        itemStyle={{ justifyContent: 'flex-start' }} // Align text to the left
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <Picker.Item key={value} label={`${value}`} value={value} />
        ))}
      </Picker>
      <Button title="Tilføj virksomhed" onPress={handleAddCompany} />
    </View>
  );
};

export default CreateCompanyScreen;