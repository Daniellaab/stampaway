// Importerer nødvendige komponenter fra React og React Native-pakkerne
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, remove } from "firebase/database";

// Funktionel komponent for visning og redigering af firmaoplysninger
function CompanyDetails({ route, navigation }) {
  // Tilstand til at holde oplysninger om det valgte firma
  const [company, setCompany] = useState(route.params.company[1]);

  // Funktion til håndtering af redigering af firmaoplysninger
  const handleEdit = () => {
    const companyData = route.params.company;
    navigation.navigate('AddCompany', { companyData });
  };

  // Funktion til bekræftelse af sletning af firma
  const confirmDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Viser en bekræftelsesdialog til brugeren
      Alert.alert('Are you sure?', 'Do you want to delete the company?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ]);
    }
  };

  // Funktion til håndtering af sletning af firma
  const handleDelete = async () => {
    const id = route.params.company[0];
    const db = getDatabase();
    const companyRef = ref(db, `Companies/${id}`);

    try {
      // Sletter firmaet fra databasen
      await remove(companyRef);
      // Navigerer tilbage til foregående skærm
      navigation.goBack();
    } catch (error) {
      // Viser en fejlbesked hvis sletningen mislykkes
      Alert.alert(error.message);
    }
  };

  // Hvis der ikke er firmaoplysninger, vises en besked
  if (!company) {
    return <Text>No data</Text>;
  }

  // Renderer firmaoplysningerne med mulighed for redigering og sletning
  return (
    <View style={styles.container}>
      {/* Viser firmaoplysningerne i et details-container */}
      <View style={styles.detailsContainer}>
        {
          Object.entries(company).map((item, index) => {
            return (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>{item[0]}</Text>
                <Text style={styles.value}>{item[1]}</Text>
              </View>
            );
          })
        }
      </View>
      {/* Knapper til redigering og sletning af firma */}
      <View style={styles.buttonsContainer}>
        {/* Knappen til redigering af firmaoplysninger */}
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        {/* Knappen til sletning af firma */}
        <TouchableOpacity style={styles.button} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stilark til komponenten
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
    width: '48%', // Justerer bredden efter behov
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompanyDetails;
