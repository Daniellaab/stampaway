import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { BarCodeScanner } from 'expo-barcode-scanner';

const StampCardScreen = ({ route }) => {
  const [stamps, setStamps] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [company, setCompany] = useState('');
  const [stampCardName, setStampCardName] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (route.params && route.params.company) {
        const id = route.params.company[0];
        const db = getDatabase();
        const companyRef = ref(db, `Companies/${id}`);

        const unsubscribe = onValue(companyRef, (snapshot) => {
          const companySnapshot = snapshot.val();
          if (companySnapshot && companySnapshot.stamps !== undefined) {
            setStamps(companySnapshot.stamps);
            setCompany(companySnapshot.name);
            setStampCardName(companySnapshot.stampCardName);
          }
        });

        return () => {
          // Cleanup: unsubscribe from the database listener
          unsubscribe();
        };
      }
    };

    fetchCompanyData();
  }, [route.params]);

  const handleStampCard = async () => {
    try {
      if (route.params && route.params.company && stamps > 0) {
        const id = route.params.company[0];
        const db = getDatabase();
        const companyRef = ref(db, `Companies/${id}`);

        // Assuming you have a function to update the stamps in your service
        await update(companyRef, { stamps: stamps - 1 });
        setStamps((prevStamps) => prevStamps - 1);
        console.log('Stamping card successful');
      } else {
        console.log('No stamps available to stamp');
      }
    } catch (error) {
      console.error('Error stamping card:', error);
    }
  };

  const handleBarCodeScanned = () => {
    setScanned(true);
    // Additional logic when a QR code is scanned, e.g., show a reward message
  };

  const toggleScanner = () => {
    setIsScanning((prevIsScanning) => !prevIsScanning);
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{company} Stamp Card</Text>
      <Text>Stamp Card Name: {stampCardName}</Text>
      <Text>Stamps: {stamps}</Text>
      <TouchableOpacity style={styles.button} onPress={handleStampCard}>
        <Text style={styles.buttonText}>Stamp</Text>
      </TouchableOpacity>
      <Button title={isScanning ? 'Stop Scanning' : 'Start Scanning'} onPress={toggleScanner} />
      {isScanning && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
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
