import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StampCardScreen = ({ route }) => {
  const { companyId, companyName } = route.params;
  const [stamps, setStamps] = useState(0);

  const handleStampCard = async () => {
    try {
      // Assuming you have a function in your service for stamping the card
      await stampCard(companyId);
      setStamps((prevStamps) => prevStamps + 1);
    } catch (error) {
      console.error('Error stamping card:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{companyName} Stamp Card</Text>
      <Text>Stamps: {stamps}</Text>
      <TouchableOpacity style={styles.button} onPress={handleStampCard}>
        <Text style={styles.buttonText}>Stamp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: '60%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StampCardScreen;
