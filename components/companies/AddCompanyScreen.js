// Importerer nødvendige komponenter fra React Native
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Importerer funktionaliteter fra Firebase Realtime Database
import { getDatabase, ref, push } from 'firebase/database';

// Importerer den globale styling fra 'globalStyles/GlobalStyles' filen
import globalStyles from '../../globalStyles/GlobalStyles';

// Funktionel komponent til at tilføje en ny virksomhed
const AddCompanyScreen = ({ navigation }) => {
  // Opretter en reference til Firebase-databasen
  const db = getDatabase();

  // Tilstande til at gemme virksomhedens navn, beskrivelse og kategori
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');

  // Funktion til at tilføje en ny virksomhed til databasen
  const addCompany = async () => {
    // Tjekker om alle felter er udfyldt, ellers viser en advarsel
    if (companyName.trim() === '' || companyDescription.trim() === '' || companyCategory.trim() === '') {
      Alert.alert('All fields are required');
      return;
    }

    try {
      // Opretter en reference til 'Companies' noden i databasen
      const companiesRef = ref(db, 'Companies');

      // Dataobjektet til den nye virksomhed
      const newCompanyData = {
        name: companyName,
        description: companyDescription,
        category: companyCategory,
      };

      // Bruger 'push' funktionen til at tilføje den nye virksomhed til databasen
      await push(companiesRef, newCompanyData);

      // Viser en succesmeddelelse og nulstiller inputfelterne
      Alert.alert('Company added successfully');
      setCompanyName('');
      setCompanyDescription('');
      setCompanyCategory('');
    } catch (error) {
      // Håndterer fejl ved tilføjelsen af virksomheden og viser en advarsel
      console.error('Error adding company:', error);
      Alert.alert('Failed to add company');
    }
  };

  // Renderer komponenten med inputfelter til virksomhedsoplysninger og en knap til at gemme virksomheden
  return (
    <View style={globalStyles.container}>
      {/* Inputfelt til virksomhedens navn */}
      <TextInput
        style={globalStyles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={(text) => setCompanyName(text)}
      />
      {/* Inputfelt til virksomhedens beskrivelse */}
      <TextInput
        style={globalStyles.input}
        placeholder="Company Description"
        value={companyDescription}
        onChangeText={(text) => setCompanyDescription(text)}
      />
      {/* Inputfelt til virksomhedens kategori */}
      <TextInput
        style={globalStyles.input}
        placeholder="Company Category"
        value={companyCategory}
        onChangeText={(text) => setCompanyCategory(text)}
      />
      {/* Knap til at gemme virksomheden, som udløser 'addCompany' funktionen ved tryk */}
      <Button title="Save Company" onPress={addCompany} />
    </View>
  );
};

// Eksporterer AddCompanyScreen komponenten som standard eksport
export default AddCompanyScreen;