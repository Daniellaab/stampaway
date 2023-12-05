// Importerer nødvendige komponenter fra React Native-pakken
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// HomeScreen komponenten, der viser menuen med forskellige skærmindgange
const HomeScreen = ({ navigation }) => {
  // Array med menuindgange og deres tilsvarende skærme
  const menuItems = [
    { title: 'Add Company', screen: 'AddCompany' },
    { title: 'All Companies', screen: 'AllCompanies' },
    { title: 'Camera', screen: 'Camera' },
    { title: 'Create Coupon', screen: 'CreateCoupon' },
    { title: 'Coupons', screen: 'Coupons' },
    { title: 'Map', screen: 'Map' },
  ];

  // Renderer komponenten med menuindgangene som berøringsvenlige knapper
  return (
    <View style={styles.container}>
      {/* Velkomstbesked */}
      <Text style={styles.buttonText}>
        Velkommen til StampAway!
      </Text>
      {/* Mapper gennem menuindgangene og opretter en berøringsvenlig knap til hver indgang */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.button}>
            {/* Viser titlen på menuindgangen på knappen */}
            <Text style={styles.buttonText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Stilark til komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

// Eksporterer HomeScreen komponenten som standard eksport
export default HomeScreen;
