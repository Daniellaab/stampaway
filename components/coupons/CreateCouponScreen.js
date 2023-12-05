// Importerer nødvendige komponenter fra React og React Native-pakkerne
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import globalStyles from '../../globalStyles/GlobalStyles';

// Komponent til oprettelse af en ny kupon for et specifikt firma
const CreateCouponScreen = ({ route }) => {
  // Opretter en forbindelse til Firebase-databasen
  const db = getDatabase();
  // Modtager det valgte firma som en parameter fra navigationen
  const company = route.params;
  // Tilstand til at opbevare beskrivelsen af den nye kupon
  const [couponDescription, setCouponDescription] = useState('');

  // Funktion til at oprette en ny kupon
  const createCoupon = async () => {
    // Tjekker om kuponbeskrivelsen er tom
    if (couponDescription.trim() === '') {
      // Viser en advarsel, hvis beskrivelsen er tom
      Alert.alert('Coupon description cannot be empty');
      return;
    }

    try {
      // Opretter en reference til 'coupons' noden under det specifikke firma
      const couponsRef = ref(db, `Coupons/${company}`);
      // Data for den nye kupon
      const newCouponData = {
        description: couponDescription,
        used: false,
      };

      // Bruger 'push' funktionen til at tilføje den nye kupon til databasen
      await push(couponsRef, newCouponData);

      // Viser en besked om, at kuponen er oprettet
      Alert.alert('Coupon created successfully');
      // Nulstiller inputfeltet til kuponbeskrivelsen
      setCouponDescription('');
    } catch (error) {
      // Hvis der opstår en fejl, vises en fejlbesked
      console.error('Error creating coupon:', error);
      Alert.alert('Failed to create coupon');
    }
  };

  // Renderer komponenten med inputfelt til kuponbeskrivelsen og en knap til at oprette kuponen
  return (
    <View style={globalStyles.container}>
      {/* Inputfelt til beskrivelsen af den nye kupon */}
      <TextInput
        style={globalStyles.input}
        placeholder="Coupon Description"
        value={couponDescription}
        onChangeText={(text) => setCouponDescription(text)}
      />
      {/* Knap til at oprette kuponen, der kalder 'createCoupon' funktionen */}
      <Button title="Create Coupon" onPress={createCoupon} color="#007aff" />
    </View>
  );
};

export default CreateCouponScreen;
