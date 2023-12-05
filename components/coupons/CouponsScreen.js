// Importerer nødvendige komponenter fra React og React Native-pakkerne
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, off } from 'firebase/database';

// Komponent til visning af kuponer for et specifikt firma
const CouponsScreen = ({ route }) => {
  // Opretter en forbindelse til Firebase-databasen
  const db = getDatabase();
  // Modtager det valgte firma som en parameter fra navigationen
  const company = route.params;
  // Tilstand til at opbevare kuponer fra det specifikke firma
  const [coupons, setCoupons] = useState([]);

  // Effekt, der kører ved første rendering og når firmaet ændres
  useEffect(() => {
    // Opretter en reference til 'coupons' noden under det specifikke firma
    const couponsRef = ref(db, `Coupons/${company}`);

    // Bruger 'onValue' funktionen til at lytte efter ændringer i 'coupons' noden under det specifikke firma
    onValue(couponsRef, (snapshot) => {
      const couponsData = snapshot.val();
      if (couponsData) {
        // Hvis der er data, opdateres tilstanden med kuponerne
        setCoupons(Object.values(couponsData));
      } else {
        // Hvis der ikke er data, opdateres tilstanden med et tomt array
        setCoupons([]);
      }
    });

    // Rydder op i lytteren, når komponenten bliver fjernet fra DOM
    return () => {
      // Afmelder lytteren
      off(couponsRef);
    };
  }, [company]);

  // Renderer komponenten med kuponerne
  return (
    <View style={styles.container}>
      {/* Viser en besked, hvis der ikke er nogen kuponer tilgængelige */}
      {coupons.length === 0 ? (
        <Text style={styles.emptyText}>No coupons available</Text>
      ) : (
        <FlatList
          style={styles.flatList}
          data={coupons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.couponContainer}>
              <Text style={styles.couponDescription}>{item.description}</Text>
              <Text style={item.used ? styles.usedText : styles.notUsedText}>
                {item.used ? 'Used' : 'Not Used'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  flatList: {
    marginTop: 20,
  },
  couponContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  couponDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  usedText: {
    color: '#f00',
    fontSize: 14,
  },
  notUsedText: {
    color: '#4caf50',
    fontSize: 14,
  },
});

export default CouponsScreen;
