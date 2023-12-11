// Her indlæses detaljer om den virksomhed som man har klikket på i listen over virksomheder.

import { getDatabase, ref, remove } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';

// Funktionel komponent til visning og redigering af virksomhedsoplysninger
function CompanyDetails({ route, navigation }) {
  // State til at gemme information om den valgte virksomhed
  const [company] = useState(route.params.company[1]);

  // Funktion til at bekræfte sletning af virksomheden
  const confirmDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Vis en bekræftelsesdialog til brugeren
      Alert.alert('Er du sikker?', 'Vil du gerne slette denne virksomhed?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Slet', style: 'destructive', onPress: handleDelete },
      ]);
    }
  };

  // Funktion til at håndtere sletning af virksomheden
  const handleDelete = async () => {
    const id = route.params.company[0];
    const db = getDatabase();
    const companyRef = ref(db, `Companies/${id}`);

    try {
      // Slet virksomheden fra databasen
      await remove(companyRef);
      // Naviger tilbage til den forrige skærm
      navigation.goBack();
    } catch (error) {
      // Vis en fejlmeddelelse, hvis sletningen mislykkes
      Alert.alert(error.message);
    }
  };

  // Hvis der ikke er nogen virksomhedsinformation, vis en besked
  if (!company) {
    return <Text>Ingen data</Text>;
  }

  // Vis virksomhedsoplysninger med mulighed for sletning
  return (
    <View style={styles.container}>
      {/* Vis virksomhedsoplysninger i en detalje-container */}
      <View style={styles.detailsContainer}>
        {Object.entries(company).map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]}</Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        {/* Knap til sletning af virksomheden */}
        <TouchableOpacity style={styles.button} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Slet</Text>
        </TouchableOpacity>
        {/* Knap til navigation til StampCardScreen */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('StampCard', { companyId: route.params.company[0], companyName: route.params.company[1].name })}
        >
          <Text style={styles.buttonText}>Stempelkort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stilarter for komponenten
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
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Eksporter CompanyDetails komponenten som standard eksport
export default CompanyDetails;