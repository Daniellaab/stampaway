// På dette screen oprettes en virksomhed med tilhørende stempelkort i databasen.

import { Picker } from '@react-native-picker/picker';
import { child, getDatabase, push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../globalStyles/GlobalStyles';

// Komponent til at oprette en virksomhed med tilhørende stempelkort
const CreateCompanyScreen = ({ navigation }) => {
  // State-hooks til at håndtere virksomhedsoplysninger og stempelkortindstillinger
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [stamps, setStamps] = useState(5);
  const [stampCardName, setStampCardName] = useState('');

  // Funktion til at håndtere tilføjelse af virksomhed
  const handleAddCompany = async () => {
    try {
      // Hent databaseinstans
      const database = getDatabase();
      const companiesRef = ref(database, 'Companies');

      // Tjek om alle inputfelter er udfyldt
      if (!companyName.trim() || !companyDescription.trim() || !stampCardName.trim()) {
        Alert.alert('Fejl', 'Alle felter er påkrævet');
        return;
      }

      // Oprettelse af virksomhedsdata
      const newCompanyData = {
        name: companyName,
        description: companyDescription,
        stamps: stamps,
        stampCardName: stampCardName,
      };

      // Oprettelse af en ny virksomhed og hentning af dens ID
      const newCompanyRef = push(companiesRef);
      const companyId = newCompanyRef.key;

      // Tilføjelse af virksomhedsdata til databasen
      await set(child(companiesRef, companyId), newCompanyData);

      // Vis en succesmeddelelse og nulstil inputfelter
      Alert.alert('Succes', `Virksomhed tilføjet med succes. ID: ${companyId}`);
      setCompanyName('');
      setCompanyDescription('');
      setStampCardName('');
    } catch (error) {
      console.error('Fejl ved tilføjelse af virksomhed:', error);
      Alert.alert('Fejl ved tilføjelse af virksomhed');
    }
  };

  return (
    // Visningslag med inputfelter, picker og knap til tilføjelse af virksomhed
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
      {/* Picker til at vælge antal stempler */}
      <Picker
        selectedValue={stamps}
        onValueChange={(itemValue, itemIndex) => setStamps(itemValue)}
        style={globalStyles.picker}
        itemStyle={{ justifyContent: 'flex-start' }} // Justér teksten til venstre
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <Picker.Item key={value} label={`${value}`} value={value} />
        ))}
      </Picker>
            <View style={{ height: 130 }} />
      {/* Knappen til at tilføje virksomhed */}
      <TouchableOpacity style={globalStyles.button} onPress={handleAddCompany}>
        <Text style={globalStyles.buttonText}>Tilføj virksomhed</Text>
      </TouchableOpacity>
    </View>
  );
};

// Eksporter CreateCompanyScreen komponenten som standard eksport
export default CreateCompanyScreen;